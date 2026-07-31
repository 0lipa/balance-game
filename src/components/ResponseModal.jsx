import { useState } from 'react'
import { ROSTER } from '../data/seats.js'

export default function ResponseModal({ assignments, onClose }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [entry, setEntry] = useState(null)

  function handleCheck() {
    setError('')
    const found = assignments[name]
    if (!found) {
      setError('아직 이 이름으로 배정된 자리가 없어요.')
      return
    }
    if (found.password !== password) {
      setError('비밀번호가 달라요. 처음 입력했던 4자리를 넣어주세요.')
      return
    }
    if (!found.answers || found.answers.length === 0) {
      setError('저장된 응답이 없어요.')
      return
    }
    setEntry(found)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="닫기">
          ✕
        </button>

        {!entry ? (
          <>
            <h3 className="display" style={{ fontSize: 20, marginBottom: 4 }}>
              내 응답 확인
            </h3>
            <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: '0 0 18px' }}>
              이름과 비밀번호를 입력하면 밸런스게임 응답을 볼 수 있어요
            </p>

            <select className="input-box" value={name} onChange={(e) => setName(e.target.value)}>
              <option value="">이름 선택</option>
              {ROSTER.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <input
              className="input-box"
              style={{ marginTop: 10 }}
              placeholder="비밀번호 4자리"
              maxLength={4}
              inputMode="numeric"
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(/[^0-9]/g, ''))}
            />

            {error && (
              <div className="notice-box" style={{ marginTop: 12 }}>
                {error}
              </div>
            )}

            <button
              className="btn btn-primary"
              style={{ marginTop: 16 }}
              onClick={handleCheck}
              disabled={!name || password.length !== 4}
            >
              확인
            </button>
          </>
        ) : (
          <>
            <h3 className="display" style={{ fontSize: 20, marginBottom: 4 }}>
              {entry.nickname}님의 응답
            </h3>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: '0 0 18px' }}>
              확인만 가능해요, 수정은 안 돼요
            </p>

            <div className="answer-list">
              {entry.answers.map((a, i) => (
                <div key={a.qId || i} className="answer-item">
                  <p className="answer-q">
                    Q{i + 1}. {a.question}
                  </p>
                  <p className="answer-a">→ {a.text}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
