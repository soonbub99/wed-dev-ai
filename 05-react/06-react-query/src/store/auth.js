// zustand : 여러 컴포넌트가 같이 쓰는 값(전역 상태)을 담는 곳
import { create } from "zustand";

// create : store 만들기
export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")), // 처음 값 : 로그인 전
  setUser: (user) => set({ user }),
  login: (token, user) => {
    console.log("store/auth -----");
    console.log(user);
    console.log("-----------------");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // 임시적인거라 새로고침 간단한 해결법
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
