import express from "express";
import {} from "express-async-errors";
import { isAuth } from "../middleware/auth.js";
import * as dailyController from "../controller/daily.js";

const router = express.Router();

router.post("/dailys", isAuth, dailyController.createDailys);
router.get("/dailys", isAuth, dailyController.getAll);

export default router;
