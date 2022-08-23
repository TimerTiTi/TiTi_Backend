import express from "express";
import { config } from "./config.js";
import { sequelize } from "./db/database.js";

const app = express();

sequelize.sync().then(() => {
  console.log(`Server is started... ${new Date()}`);
  const server = app.listen(config.port);
});
