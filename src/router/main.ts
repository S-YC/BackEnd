import { Router } from "express";
import { matchList } from "../controller/main";
import { channelList } from "../controller/main";
import { isLogin } from "../lib/auth";

const router = Router();

/**
 * Main Data Select 
 */
router.get("/matchlist", matchList);
router.get("/channellist", channelList);

export = router;
