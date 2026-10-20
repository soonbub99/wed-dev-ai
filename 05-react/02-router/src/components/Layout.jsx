import Header from "./Header.jsx";
import { Outlet } from "react-router";
// Outlet : 들어오는 주소에 맞는 페이지가 들어올 빈 자리
// ---> router.jsx의 children으로 들어간 컴포넌트
// "/" -> <Dashboard />가 Outlet 자리에 들어온다
// "/cars" -> <Cars />가 Outlet 자리에 들어온다

// 모든 페이지가 같이 쓰는 틀
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Layout;
