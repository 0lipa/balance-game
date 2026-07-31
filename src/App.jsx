import { useState } from 'react'
import { doc, getDoc, runTransaction } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase.js'
import { FIXED_NAME, FIXED_SEAT_ID, RANDOM_SEAT_IDS, SEATS } from './data/seats.js'
import Home from './components/Home.jsx'
import NameSelect from './components/NameSelect.jsx'
import ProfileSetup from './components/ProfileSetup.jsx'
import TransitionMessage from './components/TransitionMessage.jsx'
import Quiz from './components/Quiz.jsx'
import SeatReveal from './components/SeatReveal.jsx'
import SeatChart from './components/SeatChart.jsx'

function stateDocRef() {
  return doc(db, 'seatAssignments', 'state')
}

async function fetchExistingAssignment(name) {
  if (!isFirebaseConfigured) return null
  const snap = await getDoc(stateDocRef())
  if (!snap.exists()) return null
  const assignments = snap.data().assignments || {}
  return assignments[name] || null
}

// Firestore 트랜잭션으로 좌석 하나를 원자적으로 배정한다.
// 이미 배정된 이름이면 기존 좌석을 그대로 반환한다(재배정 없음).
async function assignSeat(name, nickname, password, answers) {
  let resultSeat = null

  await runTransaction(db, async (tx) => {
    const ref = stateDocRef()
    const snap = await tx.get(ref)
    const data = snap.exists() ? snap.data() : { assignments: {} }
    const assignments = { ...(data.assignments || {}) }

    if (assignments[name]) {
      resultSeat = assignments[name].seat
      return
    }

    let seat
    if (name === FIXED_NAME) {
      seat = FIXED_SEAT_ID
    } else {
      const used = Object.values(assignments).map((a) => a.seat)
      const available = RANDOM_SEAT_IDS.filter((id) => !used.includes(id))
      if (available.length === 0) {
        throw new Error('배정 가능한 자리가 없어요')
      }
      seat = available[Math.floor(Math.random() * available.length)]
    }

    assignments[name] = { seat, nickname, password, answers }
    resultSeat = seat
    tx.set(ref, { assignments }, { merge: true })
  })

  return resultSeat
}

export default function App() {
  const [step, setStep] = useState('home')
  const [selectedName, setSelectedName] = useState(null)
  const [nickname, setNickname] = useState(null)
  const [password, setPassword] = useState(null)
  const [checkingName, setCheckingName] = useState(false)
  const [seatId, setSeatId] = useState(null)
  const [alreadyAssigned, setAlreadyAssigned] = useState(false)
  const [saveStatus, setSaveStatus] = useState('idle') // idle | saving | saved | error

  async function handleNameSelect(name) {
    setSelectedName(name)
    setCheckingName(true)
    try {
      const existing = await fetchExistingAssignment(name)
      if (existing) {
        setNickname(existing.nickname)
        setPassword(existing.password)
        setSeatId(existing.seat)
        setAlreadyAssigned(true)
        setSaveStatus('saved')
        setStep('seatReveal')
      } else {
        setStep('profile')
      }
    } catch (e) {
      console.error('기존 배정 확인 실패:', e)
      setStep('profile')
    } finally {
      setCheckingName(false)
    }
  }

  function handleProfileSubmit({ nickname: nick, password: pw }) {
    setNickname(nick)
    setPassword(pw)
    setStep('transition')
  }

  function handleQuizFinish(answers) {
    setStep('assigning')
    runAssignment(answers)
  }

  async function runAssignment(answers) {
    if (!isFirebaseConfigured) {
      setSaveStatus('error')
      setSeatId(null)
      setAlreadyAssigned(false)
      setStep('seatReveal')
      return
    }
    setSaveStatus('saving')
    try {
      const seat = await assignSeat(selectedName, nickname, password, answers)
      setSeatId(seat)
      setAlreadyAssigned(false)
      setSaveStatus('saved')
    } catch (e) {
      console.error('자리 배정 실패:', e)
      setSaveStatus('error')
      setSeatId(null)
      setAlreadyAssigned(false)
    }
    setStep('seatReveal')
  }

  function handleRestart() {
    setSelectedName(null)
    setNickname(null)
    setPassword(null)
    setSeatId(null)
    setAlreadyAssigned(false)
    setSaveStatus('idle')
    setStep('home')
  }

  const seat = seatId ? SEATS.find((s) => s.id === seatId) : null

  return (
    <div className="app-shell">
      {step === 'home' && (
        <Home onStart={() => setStep('nameSelect')} onViewOthers={() => setStep('seatChart')} />
      )}

      {step === 'nameSelect' && <NameSelect onSelect={handleNameSelect} checking={checkingName} />}

      {step === 'profile' && <ProfileSetup name={selectedName} onSubmit={handleProfileSubmit} />}

      {step === 'transition' && <TransitionMessage onDone={() => setStep('quiz')} />}

      {step === 'quiz' && <Quiz onFinish={handleQuizFinish} />}

      {step === 'assigning' && (
        <div className="reveal-screen">
          <p className="drumroll">자리 배정 중... 🎲</p>
        </div>
      )}

      {step === 'seatReveal' && (
        <SeatReveal
          seatId={seatId}
          table={seat?.table}
          side={seat?.side}
          nickname={nickname}
          saveStatus={saveStatus}
          alreadyAssigned={alreadyAssigned}
          onViewChart={() => setStep('seatChart')}
          onRestart={handleRestart}
        />
      )}

      {step === 'seatChart' && <SeatChart onBack={() => setStep('home')} />}
    </div>
  )
}
