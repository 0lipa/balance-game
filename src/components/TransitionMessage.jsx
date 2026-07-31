import { useEffect, useState } from 'react'

const FULL_TEXT = '자리 배정을 위한 밸런스게임을\n시작해볼까요?'

export default function TransitionMessage({ onDone }) {
  const [display, setDisplay] = useState('')
  const [phase, setPhase] = useState('typing') // typing | holding | erasing

  useEffect(() => {
    let timer

    if (phase === 'typing') {
      let i = 0
      timer = setInterval(() => {
        i++
        setDisplay(FULL_TEXT.slice(0, i))
        if (i >= FULL_TEXT.length) {
          clearInterval(timer)
          setPhase('holding')
        }
      }, 45)
    } else if (phase === 'holding') {
      timer = setTimeout(() => setPhase('erasing'), 750)
    } else if (phase === 'erasing') {
      let j = FULL_TEXT.length
      timer = setInterval(() => {
        j--
        setDisplay(FULL_TEXT.slice(0, j))
        if (j <= 0) {
          clearInterval(timer)
          onDone()
        }
      }, 22)
    }

    return () => {
      clearInterval(timer)
      clearTimeout(timer)
    }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="center-col">
      <p className="typewriter-text">
        {display}
        <span className="cursor">|</span>
      </p>
    </div>
  )
}
