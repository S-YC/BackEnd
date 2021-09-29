import { Router } from "express";
import { signup, isEmail, isnickName } from "../controller/sign";

const router = Router();

/**
 * 회원가입, 이메일 중복확인
 */
router.post("/signup", signup);
router.post("/isEmail", isEmail);
router.post("/isnickName", isnickName);

export = router;
