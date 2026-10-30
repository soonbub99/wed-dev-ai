import Header from "./Header.jsx";
import { Outlet, useLocation, Navigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth.js";

const Layout = () => {
  const { pathname } = useLocation();
  const token = useAuthStore((state) => state.token);

  // 토큰이 없으면 로그인 화면으로 돌아가게
  //const token = localStorage.getItem("token");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // token 정보가 있으면 -> 사용자 정보를 가지고 오는 방법
    // 1. 간단하게는 localStorage로 가능
    // 2. 서버한테 토큰으로 정보를 가져움
  }, [token]);

  /*
  if (!token) {
    return <Navigate to="/login" />;
  } */

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Layout;
