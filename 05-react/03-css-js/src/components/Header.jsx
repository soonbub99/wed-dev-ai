import { Link, NavLink } from "react-router";
import { User } from "lucide-react";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-left">
          <button
            type="button"
            className="menu-toggle"
            id="menuToggle"
            aria-label="메뉴 열기"
            aria-expanded="false"
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
          <Link to="/" className="logo">
            정비노트
          </Link>
          <nav id="navMenu">
            <NavLink to="/">대시보드</NavLink>
            <NavLink to="/cars">차량관리</NavLink>
            <NavLink to="/records">정비 이력</NavLink>
            <NavLink to="/consultations">고객 상담</NavLink>
          </nav>
        </div>
        <div className="header-right">
          <div className="no-profile">
            <User size={20} color="#f8f6f6" />
          </div>
          <span className="user-name">김정비 사장님</span>
        </div>
      </header>
      <div className="menu-overlay" id="menuOverlay"></div>
    </>
  );
};
export default Header;
