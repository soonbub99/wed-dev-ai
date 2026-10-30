import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { User } from "lucide-react";
// import"../utils/menu.js";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth.js";

const Header = () => {
  const navigation = useNavigate();

  // store에서 꺼내 쓰기
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const userLogout = useAuthStore((state) => state.logout);

  //const token = localStorage.getItem("token");
  // JSON.parse : 문자열 -> 객체로
  // const user = JSON.parse(localStorage.getItem("user"));

  // 로그아웃 함수 : localStorage에서 토큰 지우고 유저 정보 지우고
  const logout = () => {
    userLogout();
    //localStorage.removeItem("token");
    //localStorage.removeItem("user");
    navigation("/");
  };

  const parhname = useLocation();

  // 메뉴가 열렸는지 (true) 닫혔는지(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // 주소가 바꿜 때마다 메뉴를 닫아버림
  // -> 링크마다 onClik={closeMinu}할 필요가 없어짐
  useEffect(() => {
    setMenuOpen(false);
  }, [parhname]);

  // 현재 컴포넌트의 라이프사이클 관리
  // 마운트(화면에 처음 나타남) - 업데이트(state, props가 바뀌면서 다시 그려짐)
  // ㄴ 언마운트(화면에서 사라짐)
  // [] : 마운트! -> 처음 나타났을 때
  // [] 안의 값이 들어간다면 그 값이 바꿜 때마다
  useEffect(() => {
    const onKeyDown = (e) => {
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
          <Link to="/" className="logo">
            정비노트
          </Link>
          {/* menuOpen 값에 따라서 active를 붙였다가(true) 떼었다가(falsa) */}
          <nav id="navMenu" className={menuOpen ? "active" : ""}>
            <NavLink to="/" onClick={closeMenu}>
              대시보드
            </NavLink>
            <NavLink to="/cars" onClick={closeMenu}>
              차량관리
            </NavLink>
            <NavLink to="/records">정비 이력</NavLink>
            <NavLink to="/consultations">고객 상담</NavLink>
          </nav>
        </div>
        <div className="header-right">
          {token ? (
            <>
              {user?.profile_image ? (
                <img
                  src={user.profile_image}
                  className="size-8 rounded-full object-cover"
                />
              ) : (
                <div className="no-profile">
                  <User size={20} color="#ffffff" />
                </div>
              )}
              <span className="user-name">{user?.name} 사장님</span>
              <button
                type="button"
                onClick={logout}
                className="cursor-pointer rounded-md border border-line"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login">로그인</Link>
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
