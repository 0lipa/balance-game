# 🎉 회식 자리 배정 밸런스게임

회식/송별회용 미니 웹앱. 이름을 고르고 닉네임/비밀번호를 입력한 뒤
밸런스게임 6문제를 풀면, 완료와 동시에 회식 자리가 랜덤으로 배정돼요.
"자리 확인"에서는 전체 좌석표를 실시간으로 볼 수 있어요.

- **React + Vite**로 제작
- 좌석 배정/조회는 **Firebase Firestore**(무료)를 사용

## 진행 흐름

1. 홈 → **시작하기**
2. 본인 이름 선택 (10명 명단 중)
   - 이미 배정된 이름이면 바로 내 자리를 보여줘요 (재배정 없음)
3. 닉네임 + 비밀번호(4자리) 입력
4. "자리 배정을 위한 밸런스게임을 시작해볼까요?" 타이핑 연출
5. 밸런스게임 6문제 (재미용, 자리 배정에는 영향 없음)
6. 두구두구 후 **내 자리 공개** — 완료 즉시 남은 좌석 중 랜덤 배정
7. 홈 → **자리 확인**에서 전체 좌석표 + 이름/비밀번호로 내 자리 하이라이트

## 좌석 배치

테이블 5개, 마주보기 2자리(A/B)씩 총 10석. **신금진**님은 가운데(3번)
테이블에 고정, 나머지 9명은 남은 9석에 랜덤 배정돼요. 명단과 배치는
`src/data/seats.js`에서 바꿀 수 있어요.

```js
export const ROSTER = ['이용채', '주민형', ...]
export const FIXED_NAME = '신금진'
export const FIXED_SEAT_ID = 'table3-A'
```

---

## 1. 로컬에서 실행해보기

```bash
npm install
npm run dev
```

터미널에 뜨는 주소(보통 `http://localhost:5173`)로 접속. 이 시점에는 아직
Firebase 설정 전이라 자리 배정 단계에서 오류 안내가 뜨는 게 정상이에요.
(아래 2번 진행하면 해결됩니다)

---

## 2. Firebase 설정하기 (약 5분)

1. [Firebase 콘솔](https://console.firebase.google.com/)에서 **프로젝트 추가**
   (신용카드 없이 무료로 가능, 이름은 아무거나 예: `farewell-party`)
2. 왼쪽 메뉴에서 **Firestore Database** → **데이터베이스 만들기** 클릭
   - 위치는 `asia-northeast3 (서울)` 선택 추천
   - 보안 규칙은 **테스트 모드로 시작**(누구나 읽고 쓸 수 있음) 선택
     → 회식용 일회성 이벤트라 이 정도면 충분해요. 이벤트 끝나면 Firestore
     콘솔에서 데이터/프로젝트를 삭제하면 됩니다.
3. 프로젝트 개요 화면(⚙️ 톱니바퀴 → 프로젝트 설정)에서 **웹 앱 추가**(</> 아이콘)
   클릭 → 앱 닉네임 아무거나 입력 → 등록
4. 화면에 뜨는 `firebaseConfig` 값을 복사해서 `src/firebase.js` 파일의
   `firebaseConfig` 부분에 그대로 붙여넣기

```js
// src/firebase.js
const firebaseConfig = {
  apiKey: '여기에 본인 값 붙여넣기',
  authDomain: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...',
}
```

5. 저장 후 `npm run dev`로 다시 확인 — 자리 배정과 자리 확인이 정상 작동하면 완료!

> 테스트 모드 보안 규칙은 30일 후 자동 만료돼요. 회식 전에 설정하면 당일까지는
> 문제없이 쓸 수 있어요.
>
> ⚠️ 비밀번호(4자리)는 암호화 없이 그대로 저장돼요. 보안용이 아니라 "내 자리
> 재확인용 간단한 잠금" 정도로만 써주세요.

---

## 3. GitHub에 올리기

```bash
git init
git add .
git commit -m "회식 자리 배정 게임"
git branch -M main
git remote add origin <본인 레포 URL>
git push -u origin main
```

(`node_modules`, `dist`는 `.gitignore`에 이미 포함되어 있어서 안 올라가요)

---

## 4. 배포하기

### 추천: Vercel (가장 빠르고 설정 거의 없음)

1. [vercel.com](https://vercel.com)에 GitHub 계정으로 로그인
2. **Add New → Project** → 방금 올린 레포 선택 → **Deploy** 클릭
3. Vite 프로젝트를 자동으로 인식해서 별도 설정 없이 1~2분 안에 배포 완료
4. 발급된 URL을 회식 자리에서 QR코드나 링크로 공유

### 대안: GitHub Pages

```bash
npm run deploy
```

레포 설정(Settings → Pages)에서 배포 브랜치를 `gh-pages`로 지정하면
`https://<아이디>.github.io/<레포이름>/` 주소로 접속할 수 있어요.

---

## 5. 커스터마이징

- **참석자 명단 / 고정석**: `src/data/seats.js`
- **밸런스게임 질문/선택지**: `src/data/questions.js`
- **색상/폰트/애니메이션**: `src/styles.css` 상단 `:root` 변수
- **타이핑 연출 문구**: `src/components/TransitionMessage.jsx`의 `FULL_TEXT`

### 선택지에 사진 넣기

이모지 대신 사진을 쓰고 싶으면:

1. 사진 파일을 `public/images/` 폴더에 넣기 (없으면 새로 만들면 됨)
2. `src/data/questions.js`에서 해당 선택지의 `image` 값을 경로로 지정

```js
optionA: {
  text: '힘들면 빈 자리 책상에 누워있음',
  image: '/images/desk-lie-down.jpg', // ← 이렇게 경로 지정
  imagePosition: 'center', // 선택사항. 인물 사진 등 잘리면 안 되는 부분이 있으면 'center 15%' 처럼 조정
},
```

`image` 값이 있으면 사진이, 없으면(`null`) 이모지가 자동으로 표시돼요.
사진은 220×130 비율로 잘려서 보이는데, 세로로 긴 사진이라 위쪽(머리 등)이
잘리면 `imagePosition`으로 크롭 위치를 조정할 수 있어요.

즐거운 회식 되세요! 🍻
