import { Profiler, useState } from "react";
import { Link, useNavigate } from "react-router";
import { User } from "lucide-react";
import { signup } from "../api/users.js";
import { toast } from "@/components/ui/toast";

const Signup = () => {
  const navigator = useNavigate();

  const [showPw, setShowPw] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 서버한테 보내는 값 중에 이미지 파일이 있는 경우 지금 형태({} : 객체)로 보낼 수 없음!
    // FormData : 글자와 파일을 값이 담는 택배 상자
    const formData = new FormData();
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append("name", e.target.userName.value);
    formData.append("phone", e.target.phone.value);
    //사진은 골랐을 때만!
    const file = e.target.profileImage.files[0];
    console.log(file);
    if (file) {
      formData.append("profile_image", file);
    }

    await signup(formData);
    toast.add({ title: "회원 가입 완료!" });
    navigator("/login");
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[var(--primary-navy)] p-6">
      {/* 서버한테 보내는 값 중에 파일 값을 보내야 한다면
          encType="multipart/form-data" form 태그에 추가하는 방식
          -> handleSubmit이라는 함수에서 처리를 하고 있느 상황
      */}
      <form
        onSubmit={handleSubmit}
        className="flex w-[400px] max-w-full flex-col gap-2.5 rounded-[20px] bg-[var(--card-bg)] p-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
      >
        <div className="text-center text-[1.05rem] font-bold text-[var(--text-primary)]">
          정비노트
        </div>
        <p className="mb-2.5 text-center text-[0.825rem] text-[var(--text-gray)]">
          자동차검사정비 · 계정 신청
        </p>

        <label
          htmlFor="su-image"
          className="mb-2 flex cursor-pointer flex-col items-center gap-2"
        >
          <div className="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--badge-d1-bg)]">
            {preview ? (
              <img
                src={preview}
                alt="프로필 미리보기"
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={40} color="var(--primary-navy)" />
            )}
          </div>
          <span className="text-[0.775rem] font-semibold text-[var(--text-gray)] hover:text-[var(--primary-navy)]">
            {preview ? "사진 바꾸기" : "사진 선택"}
          </span>
          <input
            id="su-image"
            name="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="su-email"
            className="text-[0.825rem] font-semibold text-[var(--text-primary)]"
          >
            이메일
          </label>
          <input
            id="su-email"
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
            htmlFor="su-pw"
            className="text-[0.825rem] font-semibold text-[var(--text-primary)]"
          >
            비밀번호
          </label>
          <div className="relative">
            <input
              id="su-pw"
              name="password"
              type={showPw ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              autoComplete="new-password"
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
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="su-name"
            className="text-[0.825rem] font-semibold text-[var(--text-primary)]"
          >
            이름
          </label>
          <input
            id="su-name"
            name="userName"
            type="text"
            placeholder="예: 홍길동"
            required
            className="h-[38px] w-full rounded-[10px] border border-[var(--border)] bg-[var(--card-bg)] px-3 text-[0.825rem] text-[var(--text-primary)] focus:border-[var(--primary-navy)] focus:shadow-[0_0_0_3px_var(--badge-d1-bg)] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="su-phone"
            className="text-[0.825rem] font-semibold text-[var(--text-primary)]"
          >
            연락처
          </label>
          <input
            id="su-phone"
            name="phone"
            type="tel"
            placeholder="010-1234-5678"
            required
            className="h-[38px] w-full rounded-[10px] border border-[var(--border)] bg-[var(--card-bg)] px-3 text-[0.825rem] text-[var(--text-primary)] focus:border-[var(--primary-navy)] focus:shadow-[0_0_0_3px_var(--badge-d1-bg)] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-1.5 h-[46px] border-none cursor-pointer rounded-[10px] bg-[var(--primary-navy)] text-[0.9rem] font-semibold text-white hover:bg-[var(--navy-dark)]"
        >
          계정 신청
        </button>

        <p className="flex items-center justify-center gap-2.5 text-[0.775rem] text-[var(--text-gray)]">
          <span>이미 계정이 있으신가요?</span>
          <Link
            to="/login"
            className="font-semibold text-[var(--text-gray)] hover:text-[var(--primary-navy)]"
          >
            로그인
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
