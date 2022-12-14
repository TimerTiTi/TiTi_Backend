import {} from "express-async-errors";
import { Daily } from "../class/daily.js";
import * as dailyRepository from "../data/daily.js";
import * as timelineRepository from "../data/timeline.js";
import * as taskRepository from "../data/task.js";
import * as syncLogController from "../controller/syncLog.js";

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
  // console.log(`CREATE Timeline(${createdTimelineId})`);
  // Daily -> Task 생성
  for (const key in daily.tasks) {
    const createdTaskId = await taskRepository.createTask(
      key,
      daily.tasks[key],
      req.userId,
      createdDailyId
    );
    // console.log(`CREATE Task(${createdTaskId})`);
  }
}

export async function updateDailyTimelineAndDeleteCreateTask(
  id,
  localDaily,
  req
) {
  // UPDATE Daily
  const updatedDaily = await dailyRepository.updateDailyById(id, localDaily);
  console.log(`UPDATE Daily(${id})`);
  // UPDATE Timeline
  const updatedTimeline = await timelineRepository.updateTimelineByDailyId(
    id,
    localDaily
  );
  // console.log(`UPDATE Timeline(${updatedTimeline})`);
  // DELETE Tasks
  const deletedTasks = await taskRepository.deleteAllByDailyIdAndUserId(
    id,
    req.userId
  );
  // console.log(`DELETE  ${deletedTasks} Tasks from Daily(${id})`);
  // CREATE Tasks
  for (const key in localDaily.tasks) {
    const createdTaskId = await taskRepository.createTask(
      key,
      localDaily.tasks[key],
      req.userId,
      id
    );
    // console.log(`CREATE Task(${createdTaskId})`);
  }
}

export async function findLastDaily(DBDaily, localDaily) {
  // 마지막에 생성된 Daily 여야 하지만 로직이 매우 복잡해지므로 totalTime 값을 기준으로 설정
  const dbTotalTime = DBDaily.timeline.reduce((a, b) => a + b, 0);
  const localTotalTime = localDaily.timeline.reduce((a, b) => a + b, 0);
  if (dbTotalTime > localTotalTime) {
    return DBDaily;
  } else {
    return localDaily;
  }
}

export async function uploadDailys(req, res) {
  console.log(`User(${req.userId})`);
  const dailys = req.body;
  const GMTSeconds = req.query.gmt;

  let success = true;
  let errorIds = Array();
  let uploadCount = 0;
  for (const dailyObject of dailys) {
    const localDaily = new Daily(dailyObject);
    // daily.id 값 확인
    if (localDaily.id == null) {
      // 같은 Day 의 Daily 가 있는지 확인
      const dailys = await dailyRepository.findBySameDate(
        localDaily.day,
        GMTSeconds,
        req.userId
      );
      // 같은 Daily 가 존재하지 않는 경우 -> CREATE Daily
      if (dailys.length == 0) {
        await createDailyTimelineTask(localDaily, req);
        uploadCount += 1;
        continue;
      }
      if (dailys.length > 1) {
        console.log(`** Error[Same date dailys]: count = ${dailys.length}`);
      }
      // 같은 Daily 가 존재하는 경우 -> UPDATE Daily
      const targetDaily = await findLastDaily(dailys[0], localDaily);
      // console.log(`* MERGE DAILY (${targetDaily.id})`);
      await updateDailyTimelineAndDeleteCreateTask(
        dailys[0].id,
        targetDaily,
        req
      );
      uploadCount += 1;
      continue;
    }
    // check status
    if (localDaily.status === "uploaded") {
      continue;
    }
    // find Daily by (id, userId)
    const DBDaily = await dailyRepository.findByIdAndUserId(
      localDaily.id,
      req.userId
    );
    // Check Daily
    if (!DBDaily) {
      // Error: id 값 존재하나 DB 내 없는 경우
      console.log(`** Error[uploadDailys]: not exist Daily(${localDaily.id})`);
      errorIds.push(localDaily.id);
      success = false;
      continue;
    }
    // update Daily
    await updateDailyTimelineAndDeleteCreateTask(DBDaily.id, localDaily, req);
    uploadCount += 1;
  }
  // CREATE SyncLog
  const dailysCount = await dailyRepository.getCountByUserId(req.userId);
  const createdLog = await syncLogController.createLog(
    dailysCount,
    uploadCount,
    req.userId
  );

  if (success) {
    res.sendStatus(200);
  } else {
    res.status(207).json({ error: `${JSON.stringify(errorIds)}` });
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
