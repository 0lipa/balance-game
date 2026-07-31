import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' 는 GitHub Pages 등 어떤 경로(레포 이름)에 배포하든
// 별도 설정 없이 그대로 동작하게 해줍니다.
export default defineConfig({
  plugins: [react()],
  base: './',
})
