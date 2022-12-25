import { SyncLog } from "../schema/syncLog.js";

export async function createSyncLog(dailysCount, uploadCount, userId) {
  return SyncLog.create({
    dailysCount,
    uploadCount,
    userId,
  }).then((data) => data.dataValues.id);
}

export async function getLatestLog(userId) {
  return SyncLog.findOne({
    order: [["createdAt", "DESC"]],
  });
}

// 관리자용 api
export async function dropLogs() {
  return SyncLog.drop();
}

export async function getAll() {
  return SyncLog.findAll();
}
