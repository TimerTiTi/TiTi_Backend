import { Task } from "../schema/task.js";

export async function createTask(taskName, taskTime, userId, dailyId) {
  return Task.create({
    taskName,
    taskTime,
    userId,
    dailyId,
  }).then((data) => data.dataValues.id);
}

export async function getAllByUserid(userId) {
  return Task.findAll({
    where: { userId },
  });
}

export async function deleteAllByDailyIdAndUserId(dailyId, userId) {
  return Task.destroy({
    where: { dailyId, userId },
  });
}

// 관리자용 api
export async function dropTask() {
  return Task.drop();
}

export async function getAll() {
  return Task.findAll();
}
