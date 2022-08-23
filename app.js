import express from "express";
import { config } from "./config.js";
import { sequelize } from "./db/database.js";
import authRouter from "./router/auth.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

// Router
app.use("/auth", authRouter);

// 404
app.use((req, res, next) => {
  res.sendStatus(404);
});
// ERROR
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
// Server start
sequelize.sync().then(() => {
  console.log(`Server is started... ${new Date()}`);
  const server = app.listen(config.port);
});
