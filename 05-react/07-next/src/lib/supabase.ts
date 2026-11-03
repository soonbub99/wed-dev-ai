import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();  // 요청에 들어온 쿠키
  // 서버에서 로그인 쿠키를 읽고 쓰는 Supabase 연결
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(), // 쿠키 읽기
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(
              ({ name, value, options }) =>
              cookieStore.set(name, value, options),  // 쿠키 쓰기
            );
          } catch {}
        },
      },
    },
  );
};
