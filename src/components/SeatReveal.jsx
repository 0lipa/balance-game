import { useEffect, useState } from 'react'
import { FIXED_NAME } from '../data/seats.js'

export default function SeatReveal({ seatId, table, side, nickname, saveStatus, alreadyAssigned, onViewChart, onRestart }) {
  const [revealed, setRevealed] = useState(alreadyAssigned) // 이미 배정된 경우 바로 공개

  useEffect(() => {
    if (alreadyAssigned) return
    const t = setTimeout(() => setRevealed(true), 1200)
    return () => clearTimeout(t)
  }, [alreadyAssigned])

  if (!revealed) {
    return (
      <div className="reveal-screen">
        <p className="drumroll">두구두구두구... 🥁</p>
      </div>
    )
  }

  if (!table) {
    return (
      <div className="reveal-screen">
        <div className="result-card">
          <span className="result-emoji">😵</span>
          <h2 className="result-title" style={{ fontSize: 20 }}>
            자리 배정에 실패했어요
          </h2>
          <div className="notice-box">
            ⚠️ Firebase 설정이 아직 안 되어있는 것 같아요. README.md의 "Firebase 설정하기" 단계를 먼저
            진행한 뒤 다시 시도해주세요.
          </div>
        </div>
        <div className="reveal-buttons">
          <button className="btn btn-ghost" onClick={onRestart}>
            ← 홈으로
          </button>
        </div>
      </div>
    )
  }

  const facingGeumjin = table === 3

  return (
    <div className="reveal-screen">
      <div className="result-card">
        {alreadyAssigned && <p className="result-eyebrow">이미 배정된 자리예요</p>}
        <span className="result-emoji">🪑</span>
        <p className="result-eyebrow">{nickname}님의 자리는</p>
        <h2 className="result-title">
          {table}번 테이블 · {side === 'A' ? '왼쪽' : '오른쪽'}
        </h2>

        <div className="seat-diagram">
          <div className={`seat-dot ${side === 'A' ? 'mine' : ''}`}>{side === 'A' ? '나' : ''}</div>
          <div className="seat-table-label">{table}번 테이블</div>
          <div className={`seat-dot ${side === 'B' ? 'mine' : ''}`}>{side === 'B' ? '나' : ''}</div>
        </div>

        {facingGeumjin && (
          <p className="result-desc" style={{ marginTop: 14 }}>
            {FIXED_NAME}님과 같은 테이블이에요! 👀
          </p>
        )}

        {saveStatus === 'error' && (
          <div className="notice-box">
            ⚠️ 자리 저장에 실패했어요. Firebase 설정이 아직 안 되어있다면 README.md를 확인해주세요.
          </div>
        )}
      </div>

      <div className="reveal-buttons">
        <button className="btn btn-primary" onClick={onViewChart}>
          🗺️ 전체 좌석표 보기
        </button>
        <button className="btn btn-ghost" onClick={onRestart}>
          ← 홈으로
        </button>
      </div>
    </div>
  )
}
