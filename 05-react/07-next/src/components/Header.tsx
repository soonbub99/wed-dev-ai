"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { useState, useEffect } from "react";
// lucide 아이콘 User와 이름이 겹쳐서 as로 바꿈
import type { User as LoginUser } from "@/types";
// 클라이언트 컴포넌트에서는 actions에 만들어 놓은 서버 함수를 쓸 수 있음
import { logout } from "@/app/login/actions";

const manus = [
  { href: "/", label: "대시보드" },
  { href: "/cars", label: "차량관리" },
];

// layout이 넘겨 준 사람 (로그인 안 했으면 null)
const Header = ({ user }: { user: LoginUser | null }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // 키보드 이벤트 타입 추가 : KeyboardEvunt
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    // return 함수 : 뒷정리(언마운트)
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header>
        <div className="header-left">
          <button
            type="button"
            className={menuOpen ? "menu-toggle active" : "menu-toggle"}
            id="menuToggle"
            aria-label="메뉴 열기"
            aria-expanded="false"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
          <Link href="/" className="logo">
            정비노트
          </Link>
          {/* menuOpen 값에 따라서 active를 붙였다가(true) 떼었다가(falsa) */}
          <nav id="navMenu" className={menuOpen ? "active" : ""}>
            <Link href="/">대시보드</Link>
            <Link href="/cars">차량관리 </Link>
            <Link href="/records">정비 이력</Link>
            <Link href="/consultations">고객 상담</Link>
          </nav>
        </div>
        <div className="header-right">
          {user ? (
            <>
            {user.profile_image? (
              <img
               src={user.profile_image}
                className="size-8 rounded-full object-cover"
             />
            ) : (
              <div className="no-profile">
                <User size={20} color="#ffffff" />
              </div>
            )}
              <span className="user-name">{user.name} 사장님</span>
              <form action={logout}>
                <button type="submit">로그아웃</button>
              </form>
            </>
            ) : (
            <Link href="/login">로그인</Link>
            )}
        </div>
      </header>
      {/* 바깥(어두운 배경) 클릭하면 닫기 */}
      <div
        className={menuOpen ? "menu-overlay active" : "menu-overlay"}
        id="menuOverlay"
        onClick={closeMenu}
      ></div>
    </>
  );
};
export default Header;
