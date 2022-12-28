import {} from "express-async-errors";
import * as recordTimeRepository from "../data/recordTime.js";

export async function updateRecordTime(req, res) {
  const localRecordTime = req.body;
  const DBRecordTime = await recordTimeRepository.getRecordTime(req.userId);

  if (!DBRecordTime) {
    const createdRecordTimeId = await recordTimeRepository.createRecordTime(
      localRecordTime,
      req.userId
    );
    console.log(`CREATE RecordTime(${createdRecordTimeId})`);
    res.sendStatus(201);
  } else {
    const updateRecordTimeId = await recordTimeRepository.updateRecordTime(
      DBRecordTime.id,
      localRecordTime
    );
    console.log(`UPDATE RecordTime(${DBRecordTime.id})`);
    res.sendStatus(200);
  }
}

export async function getRecordTime(req, res) {
  const data = await recordTimeRepository.getRecordTime(req.userId);
  res.status(200).json(data);
}

// master: getAll
export async function getAll(req, res) {
  const data = await recordTimeRepository.getAll();
  res.status(200).json(data);
}
