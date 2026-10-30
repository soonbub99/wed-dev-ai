import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../api/users.js";
import { toast } from "@/components/ui/toast";
import { useAuthStore } from "../store/auth.js";

const Login = () => {
  const navigation = useNavigate();
  const [showPw, setShowPw] = useState(false);

  // store에서 user를 바꾸는 함수만 꺼내옴!
  const saveLogin = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 함수가 retrn을 하면 해당 값을 받을 변수가 필요하다!
    const result = await login({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(result);
    if (result === null) {
      toast.add({ type: "error", title: "가입된 이메일이 없습니다" });
    } else if (result === "" || result === undefined || result === null) {
      toast.add({ type: "error", title: "이메일이나 비밀번호가 틀렸습니다" });
    } else {
      // store에 login 함수 실행 ! -> user 정보 정장, localStorage에 token 저장
      saveLogin(result.token, result.user);
      toast.add({ title: "로그인 성공!" });
      navigation("/");
      //토큰은 부라우저 저장소(localStorage)에 저장
      // -> 새로고침을 하든 브라우저 창을 닫든 남아있음
      //localStorage.setItem("token", result.token);
      // llcalStorage에는 String(문자열)만 들어가짐
      // JSON.stringify : 객체 -> 문자로
      //localStorage.setItem("user", JSON.stringify(result.user));
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[var(--primary-navy)] p-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-[400px] max-w-full flex-col gap-2.5 rounded-[20px] bg-[var(--card-bg)] p-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
      >
        <div className="text-center text-[1.05rem] font-bold text-[var(--text-primary)]">
          정비노트
        </div>
        <p className="mb-2.5 text-center text-[0.825rem] text-[var(--text-gray)]">
          자동차검사정비 · 관리자
        </p>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="lg-email"
            className="text-[0.825rem] font-semibold text-[var(--text-primary)]"
          >
            이메일
          </label>
          <input
            id="lg-email"
            name="email"
            type="email"
            placeholder="이메일을 입력하세요"
            autoComplete="username"
            required
            className="h-[38px] w-full rounded-[10px] border border-[var(--border)] bg-[var(--card-bg)] px-3 text-[0.825rem] text-[var(--text-primary)] focus:border-[var(--primary-navy)] focus:shadow-[0_0_0_3px_var(--badge-d1-bg)] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="lg-pw"
            className="text-[0.825rem] font-semibold text-[var(--text-primary)]"
          >
            비밀번호
          </label>
          <div className="relative">
            <input
              id="lg-pw"
              name="password"
              type={showPw ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
              required
              className="h-[38px] w-full rounded-[10px] border border-[var(--border)] bg-[var(--card-bg)] px-3 text-[0.825rem] text-[var(--text-primary)] focus:border-[var(--primary-navy)] focus:shadow-[0_0_0_3px_var(--badge-d1-bg)] focus:outline-none pr-14"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute top-1/2 right-2 border-none bg-transparent -translate-y-1/2 cursor-pointer rounded-md px-2 py-1 text-[0.75rem] font-semibold text-[var(--text-gray)] hover:bg-[#f0f2f5]"
            >
              {showPw ? "숨기기" : "보기"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-1.5 h-[46px] border-none cursor-pointer rounded-[10px] bg-[var(--primary-navy)] text-[0.9rem] font-semibold text-white hover:bg-[var(--navy-dark)]"
        >
          로그인
        </button>

        <p className="flex items-center justify-center gap-2.5 text-[0.775rem] text-[var(--text-gray)]">
          <Link
            to="/signup"
            className="font-semibold text-[var(--text-gray)] hover:text-[var(--primary-navy)]"
          >
            계정 신청
          </Link>
          <span className="text-[var(--text-muted)]">·</span>
          <a
            href="#"
            className="font-semibold text-[var(--text-gray)] hover:text-[var(--primary-navy)]"
          >
            비밀번호를 잊으셨나요?
          </a>
        </p>
      </form>
    </section>
  );
};

export default Login;
