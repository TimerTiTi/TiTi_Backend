import {} from "express-async-errors";
import { Daily } from "../class/daily.js";
import * as dailyRepository from "../data/daily.js";
import * as timelineRepository from "../data/timeline.js";
import * as taskRepository from "../data/task.js";

export async function createDailys(req, res) {
  console.log(`User(${req.userId})`);
  const dailys = req.body;
  for (const dailyObject of dailys) {
    const daily = new Daily(dailyObject);
    await createDailyTimelineTask(daily, req);
  }
  res.sendStatus(201);
}

export async function createDailyTimelineTask(daily, req) {
  // daily.status = "uploaded" 설정
  daily.status = "uploaded";
  // Daily 생성
  const createdDailyId = await dailyRepository.createDaily(daily, req.userId);
  console.log(`CREATE Daily(${createdDailyId})`);
  // Daily -> Tineline 생성
  const createdTimelineId = await timelineRepository.createTimeline(
    daily.timeline,
    req.userId,
    createdDailyId
  );
  console.log(`CREATE Timeline(${createdTimelineId})`);
  // Daily -> Task 생성
  for (const key in daily.tasks) {
    const createdTaskId = await taskRepository.createTask(
      key,
      daily.tasks[key],
      req.userId,
      createdDailyId
    );
    console.log(`CREATE Task(${createdTaskId})`);
  }
}

export async function uploadDailys(req, res) {
  console.log(`User(${req.userId})`);
  const dailys = req.body;
  let success = true;
  let errorIds = [];
  for (const dailyObject of dailys) {
    const localDaily = new Daily(dailyObject);
    // daily.id 값 확인
    if (localDaily.id == null) {
      // CREATE Daily
      await createDailyTimelineTask(localDaily, req);
    } else {
      // check status
      if (localDaily.status === "uploaded") {
        continue;
      }
      // find Daily by id
      const DBDaily = await dailyRepository.findById(localDaily.id);
      // Check Daily
      if (!DBDaily) {
        // Error: id 값 존재하나 DB 내 없는 경우
        console.log(`Error[uploadDailys]: not exist Daily(${localDaily.id})`);
        errorIds.push(localDaily.id);
        success = false;
        continue;
      }
      // Check userID
      if (DBDaily.userId !== req.userId) {
        console.log(
          `Error[uploadDailys]: defferent userId(${req.userId}) with Daily(${DBDaily.id})'s userId(${DBDaily.userId})`
        );
        errorIds.push(DBDaily.id);
        success = false;
        continue;
      }
      // UPDATE Daily
      const updated = dailyRepository.updateDailyById(DBDaily.id, localDaily);
      console.log(`UPDATE Daily(${DBDaily.id})`);
      // DELETE , UPDATE Timeline

      // DELETE , UPDATE Tasks
    }
  }
  if (success) {
    res.sendStatus(201);
  } else {
    return res.status(400).json({ error: `${errorIds}` });
  }
}

export async function getDailys(req, res) {
  console.log(`User(${req.userId})`);
  const data = await dailyRepository.getAllByUserid(req.userId);
  res.status(200).json(data);
}

// master: getAll dailys
export async function getAll(req, res) {
  const data = await dailyRepository.getAll();
  res.status(200).json(data);
}
