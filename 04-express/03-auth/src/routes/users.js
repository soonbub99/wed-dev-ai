// 라우터가 하는 일은 어떤 주소 + 메서드 <-> controller
import { Router } from "express";
import * as user from "../controllers/users.js";
// multer : 파일이 섞인 요청(FormData)을 읽어 주는 미들웨어
// --> middlewares 폴더에 upload만 다루는 함수를 만들어서 사용 (원래는)
import multer from "multer";

// memoryStorage : 서버 폴더에 저장하지 않고 메모리에 잠시
// (실제 저장은 Supabase Storage)
// 1024 바이트  -> 1KB * 1024 => 1MB * 5 => 5MB
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const router = Router();

// signup
// controller 앞에 미들웨어 필요시 추가할 수 있음 (여러개 가능)
// profile_image인 이유는 React FormData에 넣은 이름과 같으면 됨!
router.post("/signup", upload.single("profile_image"), user.signup);

// login
router.post("/login", user.login);

export default router;
