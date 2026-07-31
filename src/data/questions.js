// 각 문항은 optionA(1번) / optionB(2번) 두 선택지로 구성.
// 밸런스게임 결과는 회식 자리 배정에는 영향을 주지 않아요 (재미용).
// text 안의 \n은 줄바꿈으로 렌더링돼요 (styles.css의 white-space: pre-line).

// GitHub Pages 등 하위 경로 배포 시에도 이미지가 깨지지 않도록 BASE_URL을 붙여줌
const IMG_BASE = import.meta.env.BASE_URL

export const questions = [
  {
    id: 'q1',
    question: '둘 중 최악인 것을 고른다면?',
    optionA: {
      text: '속마음이 바로 튀어나오는 버릇\n생각하는 대로 바로 입밖으로 튀어나옴',
      emoji: '🗣️💭',
      image: `${IMG_BASE}images/q1-blurt.jpg`,
    },
    optionB: {
      text: '스트레스 받으면 소리지르는 버릇\n조금 힘들다 싶으면 벌떡 일어나 창문 열고 소리지름',
      emoji: '😤🪟',
      image: `${IMG_BASE}images/q1-scream.jpg`,
    },
  },
  {
    id: 'q2',
    question: '같이 일하기 싫은 동료는?',
    optionA: {
      text: '형광 모히칸 염색 스타일\n자리에서 엄청 돌아다녀서 움직일 때마다 머리 끝이 파티션 너머로 보임',
      emoji: '💇🌈',
      image: `${IMG_BASE}images/q2-mohawk.jpg`,
      imagePosition: 'center 15%',
    },
    optionB: {
      text: '흥 오르면 일어나 댄스 추는 동료\n하루 랜덤 1~10회, 예측불가하게 등장',
      emoji: '🕺❓',
      image: `${IMG_BASE}images/q2-dance.jpg`,
      imagePosition: 'center',
    },
  },
  {
    id: 'q3',
    question: '같이 밥 먹기 싫은 사람은?',
    optionA: {
      text: '밥 먹으러 갈 때만 보여주기식 앱 스키밍\n말 걸면 "왜 언어 앱 안 하냐"고 타박, 근데 본인은 연속학습 기록도 없음',
      emoji: '📱😒',
      image: null,
    },
    optionB: {
      text: '이어폰 한쪽 끼고 딴 세상\n대화 가끔 못 알아듣고, 흥얼거리다 갑자기 피식 웃기도 함',
      emoji: '🎧😏',
      image: null,
    },
  },
  {
    id: 'q4',
    question: '더 곤란한 대표님은?',
    optionA: {
      text: '의견 차이 생길 때마다 글러브 던지며\n"스파링해서 이긴 사람 의견으로" 하자는 용채님',
      emoji: '🥊🧤',
      image: `${IMG_BASE}images/q4-yongchae-boxing.jpg`,
      imagePosition: 'center',
    },
    optionB: {
      text: '매일 아침 차를 내려주시는 민형님\n거절하면 찻잔 들고 누가 받아줄 때까지 시무룩하게 서 있음',
      emoji: '☕😔',
      image: `${IMG_BASE}images/q4-minhyung-wait.png`,
      imagePosition: 'center',
    },
  },
  {
    id: 'q5',
    question: '최근 소개팅으로 사귀게 됐는데, 더 찜찜한 상황은?',
    optionA: {
      text: '애인이 가장 친한 동료의 전 애인\n예전에 동료가 전 애인 욕할 때 완전 공감했었음',
      emoji: '💔🤝',
      image: null,
    },
    optionB: {
      text: '애인이 내가 존경하는 동료와 싸운 사이\n그 동료는 인간성 훌륭한데, 평생 유일하게 손절한 사람이 내 애인',
      emoji: '💥😇',
      image: null,
    },
  },
  {
    id: 'q6',
    question:
      '연애 프로그램 섭외가 들어와서 나가기로 했다. 근데 알고 보니 회사 동료도 같이 나간다?!\n(꼭 나가야 함, 취소 불가)\n더 곤란한 연프는?',
    optionA: {
      text: '환승연애\n전 애인 다 잊었다고 했는데 사실 너무 재회하고 싶어서 나감',
      emoji: '🔁💌',
      image: `${IMG_BASE}images/q6-hwanseung.jpg`,
      imagePosition: 'center',
    },
    optionB: {
      text: '모태솔로지만 연애가 하고 싶어\n전 애인도 없으면서 전 애인 욕하고 비모태솔로 코스프레 했음',
      emoji: '🎭🙅',
      image: `${IMG_BASE}images/q6-motae.jpg`,
      imagePosition: 'center',
    },
  },
]
