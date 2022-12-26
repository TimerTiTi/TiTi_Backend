import {} from "express-async-errors";
import * as recordTimeRepository from "../data/recordTime.js";

export async function updateRecordTime(req, res) {
  console.log(`User(${req.userId})`);
  const localRecordTime = req.body;
  const DBRecordTime = await recordTimeRepository.getRecordTime(req.userId);
  if (!DBRecordTime) {
    const createdRecordTimeId = await createRecordTime(localRecordTime, req);
    console.log(`CREATE RecordTime(${createdRecordTimeId})`);
    res.sendStatus(201);
  } else {
    // recordStartAt 값이 큰 recordTime 으로 UPDATE
    if (localRecordTime.recordStartAt > DBRecordTime.recordStartAt) {
      console.log(`UPDATE RecordTime(${DBRecordTime.id})`);
      const updateRecordTime = await recordTimeRepository.updateRecordTime(
        DBRecordTime.id,
        localRecordTime
      );
    }
    res.sendStatus(200);
  }
}

export async function createRecordTime(recordTime, req) {
  const createdRecordTimeId = await recordTimeRepository.createRecordTime(
    recordTime,
    req.userId
  );
  return createdRecordTimeId;
}

export async function getRecordTime(req, res) {
  console.log(`User(${req.userId})`);
  const data = await recordTimeRepository.getRecordTime(req.userId);
  res.status(200).json(data);
}

// master: getAll
export async function getAll(req, res) {
  const data = await recordTimeRepository.getAll();
  res.status(200).json(data);
}
