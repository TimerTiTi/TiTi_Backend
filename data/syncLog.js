import { SyncLog } from "../schema/syncLog.js";
import { sequelize } from "../db/database.js";
import { QueryTypes } from "sequelize";

export async function createSyncLog(dailysCount, uploadCount, userId) {
  return SyncLog.create({
    dailysCount,
    uploadCount,
    userId,
  }).then((data) => data.dataValues.id);
}

export async function getLatestLog(userId) {
  const log = await sequelize.query(
    `SELECT * FROM syncLogs WHERE userId = ${userId} ORDER BY creatadAt LIMIT 1`,
    { type: QueryTypes.SELECT }
  );
  return log;
}

// 관리자용 api
export async function dropLogs() {
  return SyncLog.drop();
}

export async function getAll() {
  return SyncLog.findAll();
}
