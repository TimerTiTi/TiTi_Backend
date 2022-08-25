import express from "express";
import {} from "express-async-errors";
import { isAuth } from "../middleware/auth.js";
import * as taskController from "../controller/task.js";

const router = express.Router();

router.get("/", isAuth, taskController.getAll);

export default router;
