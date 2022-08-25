import { Task } from "../schema/task.js";

export async function createTask(taskName, taskTime, userId, dailyId) {
  return Task.create({
    taskName,
    taskTime,
    userId,
    dailyId,
  }).then((data) => data.dataValues.id);
}

// 관리자용 api
export async function getAll() {
  return Task.findAll();
}
