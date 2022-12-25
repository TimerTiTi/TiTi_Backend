import express from "express";
import {} from "express-async-errors";
import { isAuth } from "../middleware/auth.js";
import * as syncLogController from "../controller/syncLog.js";

const router = express.Router();

router.get("/", isAuth, syncLogController.getLog);

export default router;
