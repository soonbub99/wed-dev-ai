import Header from "@/components/Header";
// 지금 로그인한 사람 ( 서버 함수 )
import { getCurrentUser } from "@/lib/data/auth";

// 서버 컴포넌트라 async ~ await 바로 가능
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
   return (
    <>
      <Header user={user} />
      {children}
    </>
  );
};
export default Layout;
