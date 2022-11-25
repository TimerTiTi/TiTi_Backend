import express from "express";
import {} from "express-async-errors";
import { isAuth } from "../middleware/auth.js";
import * as dailyController from "../controller/daily.js";

const router = express.Router();

router.post("/create", isAuth, dailyController.createDailys);
router.post("/upload", isAuth, dailyController.uploadDailys);
router.get("/", isAuth, dailyController.getDailys);
router.get("/master", isAuth, dailyController.getAll);

export default router;
