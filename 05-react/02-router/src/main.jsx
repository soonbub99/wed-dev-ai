import { createRoot } from "react-dom/client";
//RouterProvider : router를 연결 - 주소창의 주소에 맞는 화면을 그려 준다
import { RouterProvider } from "react-router";
import router from "./router.jsx";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
