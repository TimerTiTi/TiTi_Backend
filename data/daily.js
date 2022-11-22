import { Daily } from "../schema/daily.js";

export async function createDaily(daily, userId) {
  const { day, maxTime, timeline, tasks, taskHistorys } = daily;
  return Daily.create({
    day,
    maxTime,
    timeline,
    tasks,
    taskHistorys,
    userId,
  }).then((data) => data.dataValues.id);
}

export async function getAllByUserid(userId) {
  return Daily.findAll({
    where: { userId },
  });
}

// 관리자용 api
export async function getAll() {
  return Daily.findAll();
}
