import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import path from "node:path"; //path : 폴더 경로를 만드는 Node 기반 도구

// https://vite.dev/config/
export default defineConfig({
  //플러그인 :  Vite가 화면을 만들 때 같이 일하는 도구
  // Vite에 Tailwind 플러그인 연결
  plugins: [react(), tailwindcss()],
  // alias : "@/components/ui/shadcn 컴포넌트"의 @을 src 폴드로 바꿔 읽어라
  resolve: {
    alias: { "@" : path.resolve(import.meta.dirname, "./src") },
  },
});
