import { createRoot } from "react-dom/client";
//RouterProvider : router를 연결 - 주소창의 주소에 맞는 화면을 그려 준다
import { RouterProvider } from "react-router";
import router from "./router.jsx";
import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/layout.css";
import "./styles/header.css";
import "./styles/tailwind.css";
import { Toaster } from "./components/ui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient : 받아 온 데이터를 보관하는 창고
const queryClient = new QueryClient();

// QueryClientProvider로 전체를 감싸면 어느 컴포넌트에서든 useQuery 사용 가능
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster />
  </QueryClientProvider>,
);
