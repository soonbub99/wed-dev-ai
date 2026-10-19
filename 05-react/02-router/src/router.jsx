// createVrowserRouter : 주소(URL)와 화면(컴포넌트)을 연결하는 router를 만드는 함수
import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard.jsx";
import Cars from "./pages/Cars.jsx";

// 주소(URL) <-> 화면 연결 = 객체 하나 { path, element }
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/cars",
    element: <Cars />,
  },
]);

export default router;
