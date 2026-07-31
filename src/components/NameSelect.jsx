import { ROSTER } from '../data/seats.js'

export default function NameSelect({ onSelect, checking }) {
  return (
    <div className="center-col">
      <div className="blob" style={{ width: 120, height: 120, background: 'var(--mint)', top: -20, left: -30 }} />
      <h2 className="display" style={{ fontSize: 24, marginBottom: 4 }}>
        누구세요? 👋
      </h2>
      <p style={{ color: 'var(--ink-soft)', fontSize: 15, margin: '0 0 20px' }}>
        본인 이름을 눌러주세요
      </p>

      <div className="name-grid">
        {ROSTER.map((name) => (
          <button
            key={name}
            className="name-chip"
            disabled={checking}
            onClick={() => onSelect(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}
