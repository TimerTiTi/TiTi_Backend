import { } from "express-async-errors";
import { Daily } from "../class/daily.js";
import * as dailyRepository from "../data/daily.js";
import * as timelineRepository from "../data/timeline.js";
import * as taskRepository from "../data/task.js";
import * as syncLogController from "../controller/syncLog.js";
import * as slackWebHock from "../slackWebHock.js";

export async function createDailys(req, res) {
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
  // taskHistorys 비교가 안되는 경우 -> totalTime 값 기준으로 설정
  if (!DBDaily.taskHistorys || !localDaily.taskHistorys) {
    const dbTotalTime = DBDaily.timeline.reduce((a, b) => a + b, 0);
    const localTotalTime = localDaily.timeline.reduce((a, b) => a + b, 0);
    if (dbTotalTime > localTotalTime) {
      return DBDaily;
    } else {
      return localDaily;
    }
  }

  // Daily 내 taskHistorys 의 startDate 값이 큰 Daily 를 기준으로 설정
  const dbSortedHistorys = Object.values(DBDaily.taskHistorys)
    .flatMap((obj) => obj)
    .sort((a, b) => {
      a.startDate < b.startDate;
    });
  const dbStartDate = dbSortedHistorys[dbSortedHistorys.length - 1].startDate;

  const localSortedHistorys = Object.values(localDaily.taskHistorys)
    .flatMap((obj) => obj)
    .sort((a, b) => {
      a.startDate < b.startDate;
    });
  const localStartDate =
    localSortedHistorys[localSortedHistorys.length - 1].startDate;

  if (localStartDate > dbStartDate) {
    return localDaily;
  } else {
    return DBDaily;
  }
}

export async function uploadDailys(req, res) {
  console.log(`User(${req.userId})`);
  const dailys = req.body;
  const GMTSecondsWithQueryParam = req.query.gmt;
  const GMTSecondsWithHeader = req.get("gmt");
  const GMTSeconds = GMTSecondsWithQueryParam || GMTSecondsWithHeader;
  console.log(GMTSeconds);

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
      slackWebHock.post(req.method, req.originalUrl, 207, "/controller/daily.js", `Daily(${localDaily.id}) not exist`);
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
