import {} from "express-async-errors";
import { Daily } from "../class/daily.js";
import * as dailyRepository from "../data/daily.js";

export async function createDailys(req, res) {
  const dailys = req.body;
  dailys.forEach((dailyObject) => {
    const daily = new Daily(dailyObject);
    const createdDailyId = dailyRepository.createDaily(daily);
    console.log(createdDailyId);
  });
  res.sendStatus(201);
}

export async function getAll(req, res) {
  const data = await dailyRepository.getAll();
  res.status(200).json(data);
}
