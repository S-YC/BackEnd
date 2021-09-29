import { Router } from "express";
import { isEmailSelect } from "../controller/login";

const router = Router();

/**
 * 회원가입, 이메일 중복확인
 */
router.post("/isEmailSelect", isEmailSelect);


export = router;
