import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase.js'
import { ROSTER, SEATS } from '../data/seats.js'
import ResponseModal from './ResponseModal.jsx'

export default function SeatChart({ onBack }) {
  const [assignments, setAssignments] = useState({})
  const [status, setStatus] = useState('loading') // loading | ok | error
  const [lookupName, setLookupName] = useState('')
  const [lookupPassword, setLookupPassword] = useState('')
  const [highlightSeat, setHighlightSeat] = useState(null)
  const [lookupError, setLookupError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setStatus('error')
      return
    }
    const ref = doc(db, 'seatAssignments', 'state')
    const unsub = onSnapshot(
      ref,
      (snap) => {
        setAssignments(snap.exists() ? snap.data().assignments || {} : {})
        setStatus('ok')
      },
      () => setStatus('error')
    )
    return () => unsub()
  }, [])

  function handleFindSeat() {
    setLookupError('')
    setHighlightSeat(null)
    const entry = assignments[lookupName]
    if (!entry) {
      setLookupError('아직 이 이름으로 배정된 자리가 없어요.')
      return
    }
    if (entry.password !== lookupPassword) {
      setLookupError('비밀번호가 달라요. 처음 입력했던 4자리를 넣어주세요.')
      return
    }
    setHighlightSeat(entry.seat)
  }

  const nameForSeat = (seatId) => {
    const found = Object.entries(assignments).find(([, v]) => v.seat === seatId)
    return found ? found[1].nickname : null
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="others-header">
        <h2 className="display" style={{ fontSize: 24, margin: '0 0 6px' }}>
          🗺️ 전체 좌석표
        </h2>
        <p className="others-count">
          {status === 'ok' ? `${Object.keys(assignments).length} / ${ROSTER.length}명 배정 완료` : ' '}
        </p>
        {status === 'ok' && (
          <button className="top-btn" onClick={() => setModalOpen(true)}>
            📝 응답 확인
          </button>
        )}
      </div>

      {status === 'error' && (
        <div className="notice-box">
          ⚠️ 아직 Firebase 설정이 안 되어있어요. README.md의 "Firebase 설정하기" 단계를 먼저 진행해주세요.
        </div>
      )}

      {status === 'ok' && (
        <>
          <div className="lookup-box">
            <select className="input-box" value={lookupName} onChange={(e) => setLookupName(e.target.value)}>
              <option value="">내 이름 선택</option>
              {ROSTER.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <input
              className="input-box"
              placeholder="비밀번호 4자리"
              maxLength={4}
              inputMode="numeric"
              value={lookupPassword}
              onChange={(e) => setLookupPassword(e.target.value.replace(/[^0-9]/g, ''))}
            />
            <button className="btn btn-secondary" onClick={handleFindSeat} disabled={!lookupName || lookupPassword.length !== 4}>
              내 자리 찾기
            </button>
            {lookupError && <div className="notice-box">{lookupError}</div>}
          </div>

          <div className="chart-tables">
            {[1, 2, 3, 4, 5].map((table) => (
              <div key={table} className={`chart-table-row ${table === 3 ? 'fixed-table' : ''}`}>
                <span className="chart-table-num">{table}</span>
                {['A', 'B'].map((side) => {
                  const seatId = `table${table}-${side}`
                  const occupant = nameForSeat(seatId)
                  return (
                    <div
                      key={seatId}
                      className={`chart-seat ${occupant ? 'filled' : ''} ${highlightSeat === seatId ? 'highlight' : ''}`}
                    >
                      {occupant || '미배정'}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="back-link">
        <button className="btn btn-ghost" onClick={onBack}>
          ← 홈으로
        </button>
      </div>

      {modalOpen && <ResponseModal assignments={assignments} onClose={() => setModalOpen(false)} />}
    </div>
  )
}
