import { Router } from "express";
import { matchList } from "../controller/main";
import { channelList } from "../controller/main";
import { isLogin } from "../lib/auth";

const router = Router();

/**
 * Main Data Select 
 */
router.post("/matchList", matchList);
router.post("/channelList", channelList);

export = router;
