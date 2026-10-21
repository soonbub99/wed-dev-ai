import Header from "./Header.jsx";
import { Outlet, useLocation  } from "react-router";
import { useEffect } from "react";
// Outlet : 들어오는 주소에 맞는 페이지가 들어올 빈 자리
// ---> router.jsx의 children으로 들어간 컴포넌트
// "/" -> <Dashboard />가 Outlet 자리에 들어온다
// "/cars" -> <Cars />가 Outlet 자리에 들어온다

// 모든 페이지가 같이 쓰는 틀
const Layout = () => {
  // pathname : 주소에서 뒷 부분 (/, /cars, /login)
  const { pathname } = useLocation();

  //주소가 바뀔 때마다 맨 위로!
  // window.scrollTo(가로,세로) :브라우저 스크롤을 그 위치로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Layout;
