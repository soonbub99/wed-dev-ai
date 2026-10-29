// 비밀번호 해시, 토큰 만들기 supabase 인증이 대신 하도록
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// 서버는 여러 클라이언트가 같이 쓰기 때문에 -> 로그인 상태를 서버에 저장하니 않겠다.
export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
);
