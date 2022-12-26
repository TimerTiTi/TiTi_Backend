import { RecordTime } from "../schema/recordTime.js";

export async function createRecordTime(recordTime, userId) {
  const {
    settedTimerTime,
    settedGoalTime,
    savedSumTime,
    savedTimerTime,
    savedStopwatchTime,
    savedGoalTime,
    recordingMode,
    recordTask,
    recordTaskFromTime,
    recording,
    recordStartAt,
    recordStartTimeline,
  } = recordTime;
  return RecordTime.create({
    settedTimerTime,
    settedGoalTime,
    savedSumTime,
    savedTimerTime,
    savedStopwatchTime,
    savedGoalTime,
    recordingMode,
    recordTask,
    recordTaskFromTime,
    recording,
    recordStartAt,
    recordStartTimeline,
    userId,
  }).then((data) => data.dataValues.id);
}

export async function updateRecordTime(id, newRecordTime) {
  return RecordTime.upsert({
    id: id,
    settedTimerTime: newRecordTime.settedTimerTime,
    settedGoalTime: newRecordTime.settedGoalTime,
    savedSumTime: newRecordTime.savedSumTime,
    savedTimerTime: newRecordTime.savedTimerTime,
    savedStopwatchTime: newRecordTime.savedStopwatchTime,
    savedGoalTime: newRecordTime.savedGoalTime,
    recordingMode: newRecordTime.recordingMode,
    recordTask: newRecordTime.recordTask,
    recordTaskFromTime: newRecordTime.recordTaskFromTime,
    recording: newRecordTime.recording,
    recordStartAt: newRecordTime.recordStartAt,
    recordStartTimeline: newRecordTime.recordStartTimeline,
  });
}

export async function getRecordTime(userId) {
  return RecordTime.findOne({
    where: { userId },
  });
}

// 관리자용 api
export async function dropRecordTime() {
  return RecordTime.drop();
}

export async function getAll() {
  return RecordTime.findAll();
}
