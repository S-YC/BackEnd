import  { Router } from "express";
import { login, securityKey } from "../controller/user";
import { signup, isCheck } from "../controller/sign";
import { isLogin } from "../lib/auth";

const router = Router();


/**
 * 유저 로그인
 */
router.post("/login", login);
router.post("/key", isLogin, securityKey);
/**
 * 회원가입
 */
router.post("/member", signup);
/**
 * 이이디,닉네임 중복검사(동적 라우팅)
 */
router.get("/member/:type", isCheck);


export = router;
