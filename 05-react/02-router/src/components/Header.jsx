import { Link, NavLink } from "react-router";
/*
  a 태그는 브라우저가 해당 주소의 html을 통째로 새로 받아 온다
    -> 화면이 깜빡이고 , state가 전부 사라진다
    -> 리액트 내부에서 계속 사용하신다면 외부 링크 연결시
    Link는 눌러도 새로 받지 않는다
    -> 주송만 바꾸고 라우터가 그 주소에 맞는 화면만 갈아끼운다
*/
const activeStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    textDecration: isActive ? "underline" : "none",
});

// 기존 header에 해당하는 태그들만
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
            <NavLink to="/" style={activeStyle}>
            대시보드
            </NavLink>
            <NavLink to="/cars" style={activeStyle}>
            차량관리
            </NavLink>
            <NavLink to="/records" style={activeStyle}>
            정비 이력
            </NavLink>
            <NavLink to="/consultations" style={activeStyle}>
            고객 상담
            </NavLink>
           </nav>
        </div>
        <div className="header-right">
          <div className="no-profile">김</div>
          <span className="user-name">김정비 사장님</span>
        </div>
      </header>
      <div className="menu-overlay" id="menuOverlay"></div>
    </>
  );
};
export default Header;
