import { Daily } from "../schema/daily.js";
import { sequelize } from "../db/database.js";
import { QueryTypes } from "sequelize";

export async function createDaily(daily, userId) {
  const { day, maxTime, timeline, tasks, taskHistorys, status } = daily;
  return Daily.create({
    day,
    maxTime,
    timeline,
    tasks,
    taskHistorys,
    userId,
    status,
  }).then((data) => data.dataValues.id);
}

export async function getAllByUserid(userId) {
  return Daily.findAll({
    where: { userId },
  });
  // console.log("query style");
  // const users = await sequelize.query(
  //   `SELECT * FROM dailies WHERE userId = ${userId}`,
  //   {
  //     type: QueryTypes.SELECT,
  //   }
  // );
  // return users;
}

export async function getCountByUserId(userId) {
  return Daily.count({
    where: { userId },
  });
}

export async function findByIdAndUserId(id, userId) {
  return Daily.findOne({
    where: { id, userId },
  });
}

export async function updateDailyById(id, localDaily) {
  return Daily.findByPk(id) //
    .then((daily) => {
      daily.maxTime = localDaily.maxTime;
      daily.tasks = localDaily.tasks;
      daily.timeline = localDaily.timeline;
      daily.taskHistorys = localDaily.taskHistorys;
      daily.status = "uploaded";
      return daily.save();
    });
}

// 관리자용 api
export async function dropDaily() {
  return Daily.drop();
}

export async function getAll() {
  return Daily.findAll();
}
