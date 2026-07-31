// 참석자 명단 (총 10명)
export const ROSTER = [
  '이용채',
  '주민형',
  '유민하',
  '정우진',
  '신금진',
  '조주선',
  '박지수',
  '유시오',
  '박지해',
  '윤민교',
]

// 가운데(3번) 테이블에 고정으로 앉는 사람과 좌석
export const FIXED_NAME = '신금진'
export const FIXED_SEAT_ID = 'table3-A'

// 5개 테이블 x 마주보기 2자리(A/B) = 총 10석
export const SEATS = [1, 2, 3, 4, 5].flatMap((table) => [
  { id: `table${table}-A`, table, side: 'A' },
  { id: `table${table}-B`, table, side: 'B' },
])

// 랜덤 배정 대상이 되는 좌석 (고정석 제외, 9석)
export const RANDOM_SEAT_IDS = SEATS.map((s) => s.id).filter((id) => id !== FIXED_SEAT_ID)

export function seatLabel(seatId) {
  const seat = SEATS.find((s) => s.id === seatId)
  if (!seat) return seatId
  return `${seat.table}번 테이블 · ${seat.side === 'A' ? '왼쪽' : '오른쪽'} 자리`
}
