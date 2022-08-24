import {} from "express-async-errors";
import { Daily } from "../class/daily.js";

export async function createDailys(req, res) {
  const dailys = req.body;
  dailys.forEach((dailyObject) => {
    const daily = new Daily(dailyObject);
    daily.print();
  });
  res.sendStatus(201);
}
