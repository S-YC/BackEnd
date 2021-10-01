import { Router } from "express";
import { signup} from "../controller/sign";

const router = Router();

/**
 * 회원가입, 이메일 중복확인
 */
router.post("/signup", signup);

router.post("/signup", signup);
router.get("/signup/:key?type=email", signup);
router.delete("/signup/:id", signup);

export = router;
