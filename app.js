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

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

// Router
app.use("/auth", authRouter);
app.use("/dailys", dailyRouter);
app.use("/timelines", timelineRouter);
app.use("/tasks", taskRouter);

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
