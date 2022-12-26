import express from "express";
import {} from "express-async-errors";
import { isAuth } from "../middleware/auth.js";
import * as recordTimeController from "../controller/recordTime.js";

const router = express.Router();

router.post("/", isAuth, recordTimeController.updateRecordTime);
router.get("/", isAuth, recordTimeController.getRecordTime);

export default router;
