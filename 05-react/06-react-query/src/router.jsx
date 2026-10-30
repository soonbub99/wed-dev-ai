// createVrowserRouter : 주소(URL)와 화면(컴포넌트)을 연결하는 router를 만드는 함수
import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard.jsx";
import Cars from "./pages/Cars.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

// 주소(URL) <-> 화면 연결 = 객체 하나 { path, element }
// path : 주소창에서 locaohost:5173 뒤에 오는 부분
// element : 그 매칭된 path 주소일 때 그릴 화면
// children에서 첫 화면("/")는 index: true
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "cars", element: <Cars /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
]);

export default router;

/*
  - SSR(Server Side Rendering) : 서버에서 화면을 그려내서 브라우저 전달 --> Next.js
  - CSR(Client Side Rendering) : 클라이언트에서 화면을 그려내는 방식 --> React
  - SPA(Single Page Application) : HTML 페이지가 하나뿐인 애플리케이션 --> React
*/
