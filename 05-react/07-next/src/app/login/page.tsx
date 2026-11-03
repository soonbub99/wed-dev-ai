"use client";
import { useState } from "react";
import Link from "next/link.js";
import { toast } from "@/components/ui/toast";

const Login = () => {
  const [showPw, setShowPw] = useState(false);

  return (
    <section className="flex min-h-screen items-center justify-center bg-[var(--primary-navy)] p-6">
      <form className="flex w-[400px] max-w-full flex-col gap-2.5 rounded-[20px] bg-[var(--card-bg)] p-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
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
            href="/signup"
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
