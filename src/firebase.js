// ⚠️ 이 파일은 README.md의 "Firebase 설정하기" 안내를 따라
// 본인의 Firebase 프로젝트 값으로 꼭 교체해야 합니다.
// (Firebase 콘솔 > 프로젝트 설정 > 일반 > 내 앱 > SDK 설정 및 구성 에서 복사)
// 실제 값은 프로젝트 루트의 .env 파일에 설정하세요 (.env.example 참고)

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// 설정을 아직 안 했는지 여부 (안내 문구 표시용)
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey)

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
