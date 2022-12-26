import express from "express";
import { config } from "./config.js";
import { sequelize } from "./db/database.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./router/auth.js";
import dailyRouter from "./router/daily.js";
import timelineRouter from "./router/timeline.js";
import taskRouter from "./router/task.js";
import masterRouter from "./router/master.js";
import syncLogRouter from "./router/syncLog.js";
import recordTimeRouter from "./router/recordTime.js";

const app = express();
// parser 용량제한 해제
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(helmet());
app.use(cors());
app.use(morgan("[:date[iso]] :method :url :status :response-time ms"));

// Router
app.use("/auth", authRouter);
app.use("/dailys", dailyRouter);
app.use("/timelines", timelineRouter);
app.use("/tasks", taskRouter);
app.use("/master", masterRouter);
app.use("/syncLog", syncLogRouter);
app.use("/recordTime", recordTimeRouter);

const NOTFOUND_ERROR = { error: "Not Found" };
const INTERNAL_ERROR = { error: "Internal Server Error" };
// NOTFOUND_ERROR
app.use((req, res, next) => {
  return res.status(404).json(NOTFOUND_ERROR);
});
// INTERNAL_ERROR
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).json(INTERNAL_ERROR);
});
// Server start
sequelize.sync().then(() => {
  console.log(`Server is started... ${new Date()}`);
  const server = app.listen(config.port);
});
