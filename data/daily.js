import { Daily } from "../schema/daily.js";

export async function createDaily(daily) {
  return Daily.create(daily).then((data) => data.dataValues.id);
}

// 관리자용 api
export async function getAll() {
  return Daily.findAll();
}
