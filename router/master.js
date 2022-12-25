import express from "express";
import {} from "express-async-errors";
import { isAuth } from "../middleware/auth.js";

import { dropUser } from "../data/user.js";
import { dropDaily } from "../data/daily.js";
import { dropTask } from "../data/task.js";
import { dropTimeline } from "../data/timeline.js";
import { dropLogs } from "../data/syncLog.js";

const router = express.Router();

router.delete("/dropAll", isAuth, dropAll);

async function dropAll(req, res) {
  console.log("*** DROP ALL ***");

  const dropTaskStatus = await dropTask();
  console.log("DROP TASK COMPLETE");
  const dropTimelineStatus = await dropTimeline();
  console.log("DROP TIMELINE COMPLETE");
  const dropDailyStatus = await dropDaily();
  console.log("DROP DAILY COMPLETE");
  const dropLogStatus = await dropLogs();
  console.log("DROP SYNCLOG COMPLETE");
  const dropUserStatus = await dropUser();
  console.log("DROP USER COMPLETE");
  res.sendStatus(204);
}

export default router;
