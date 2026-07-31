export default function Home({ onStart, onViewOthers }) {
  return (
    <div className="home-screen">
      <div className="blob" style={{ width: 140, height: 140, background: 'var(--pink)', top: -30, left: -40 }} />
      <div className="blob" style={{ width: 100, height: 100, background: 'var(--blue)', top: 60, right: -30, animationDelay: '1.5s' }} />
      <div className="blob" style={{ width: 90, height: 90, background: 'var(--mint)', bottom: 40, left: -20, animationDelay: '3s' }} />

      <div className="home-badge">🍻 불금 회식 스페셜</div>
      <h1 className="home-title">
        오늘의 <span>자리</span>는 어디?
      </h1>
      <p className="home-subtitle">
        밸런스게임 한 판 하고
        <br />
        회식 자리를 배정받아보세요
      </p>

      <div className="home-buttons">
        <button className="btn btn-primary" onClick={onStart}>
          🎮 시작하기
        </button>
        <button className="btn btn-secondary" onClick={onViewOthers}>
          🗺️ 자리 확인
        </button>
      </div>
    </div>
  )
}
