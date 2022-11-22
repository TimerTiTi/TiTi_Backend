import {} from "express-async-errors";
import { Daily } from "../class/daily.js";
import * as dailyRepository from "../data/daily.js";
import * as timelineRepository from "../data/timeline.js";
import * as taskRepository from "../data/task.js";

export async function createDailys(req, res) {
  console.log(req.userId);
  const dailys = req.body;
  for (const dailyObject of dailys) {
    const daily = new Daily(dailyObject);
    // daily 생성
    const createdDailyId = await dailyRepository.createDaily(daily, req.userId);
    // daily -> tineline 생성
    const createdTimelineId = await timelineRepository.createTimeline(
      daily.timeline,
      req.userId,
      createdDailyId
    );
    console.log(
      `created daily(${createdDailyId}), timeline(${createdTimelineId})`
    );
    // daily -> task 생성
    for (const key in daily.tasks) {
      const createdTaskId = await taskRepository.createTask(
        key,
        daily.tasks[key],
        req.userId,
        createdDailyId
      );
      console.log(`created task(${createdTaskId})`);
    }
  }
  res.sendStatus(201);
}

export async function getDailys(req, res) {
  console.log(req.userId);
  const data = await dailyRepository.getAllByUserid(req.userId);
  res.status(200).json(data);
}

// master: getAll dailys
export async function getAll(req, res) {
  const data = await dailyRepository.getAll();
  res.status(200).json(data);
}
