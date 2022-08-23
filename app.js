import express from "express";
import { config } from "./config.js";
import { sequelize } from "./db/database.js";
import authRouter from "./router/auth.js";

const app = express();

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
