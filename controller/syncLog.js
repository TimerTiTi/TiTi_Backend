import {} from "express-async-errors";
import * as syncLogRepository from "../data/syncLog.js";

export async function createLog(dailysCount, uploadCount, userId) {
  const createdLogId = await syncLogRepository.createSyncLog(
    dailysCount,
    uploadCount,
    userId
  );
  return createdLogId;
}

export async function getLog(req, res) {
  const data = await syncLogRepository.getLatestLog(req.userId);
  res.status(200).json(data);
}

// master: getAll
export async function getAll(req, res) {
  const data = await syncLogRepository.getAll();
  res.status(200).json(data);
}
