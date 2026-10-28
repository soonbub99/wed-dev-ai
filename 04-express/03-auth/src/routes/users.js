// 라우터가 하는 일은 어떤 주소 + 메서드 <-> controller
import { Router } from "express";
import * as user from "../controllers/users.js";

const router = Router();

// signup
router.post("/signup", user.signup);

// login
router.post("/login", user.login);

export default router;
