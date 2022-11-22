import express from "express";
import {} from "express-async-errors";
import { isAuth } from "../middleware/auth.js";
import * as timelineController from "../controller/timeline.js";

const router = express.Router();

router.get("/", isAuth, timelineController.getTimelines);
router.get("/master", isAuth, timelineController.getAll);

export default router;
