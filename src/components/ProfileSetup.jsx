import { useState } from 'react'

export default function ProfileSetup({ name, onSubmit, error }) {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  const canSubmit = password.length === 4

  return (
    <div className="center-col">
      <div className="blob" style={{ width: 110, height: 110, background: 'var(--lavender)', top: 10, right: -30 }} />
      <h2 className="display" style={{ fontSize: 24, marginBottom: 4 }}>
        {name}님, 반가워요! 🙌
      </h2>
      <p style={{ color: 'var(--ink-soft)', fontSize: 15, margin: '0 0 20px' }}>
        좌석표에 표시될 닉네임과, 나중에 자리 확인할 때 쓸
        <br />
        비밀번호(숫자 4자리)를 입력해주세요
      </p>

      <input
        className="input-box"
        placeholder="닉네임 (예: 야근투사, 회식요정)"
        value={nickname}
        maxLength={10}
        onChange={(e) => setNickname(e.target.value)}
      />

      <input
        className="input-box"
        style={{ marginTop: 12 }}
        placeholder="비밀번호 4자리"
        value={password}
        maxLength={4}
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(e) => setPassword(e.target.value.replace(/[^0-9]/g, ''))}
      />

      {error && <div className="notice-box" style={{ marginTop: 14 }}>{error}</div>}

      <div className="home-buttons" style={{ marginTop: 22 }}>
        <button
          className="btn btn-primary"
          disabled={!canSubmit}
          style={!canSubmit ? { opacity: 0.5 } : undefined}
          onClick={() => onSubmit({ nickname: nickname.trim() || name, password })}
        >
          다음 →
        </button>
      </div>
    </div>
  )
}
