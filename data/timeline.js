import { Timeline } from "../schema/timeline.js";

export async function createTimeline(timeline, userId, dailyId) {
  return Timeline.create({
    time0: timeline[0],
    time1: timeline[1],
    time2: timeline[2],
    time3: timeline[3],
    time4: timeline[4],
    time5: timeline[5],
    time6: timeline[6],
    time7: timeline[7],
    time8: timeline[8],
    time9: timeline[9],
    time10: timeline[10],
    time11: timeline[11],
    time12: timeline[12],
    time13: timeline[13],
    time14: timeline[14],
    time15: timeline[15],
    time16: timeline[16],
    time17: timeline[17],
    time18: timeline[18],
    time19: timeline[19],
    time20: timeline[20],
    time21: timeline[21],
    time22: timeline[22],
    time23: timeline[23],
    userId,
    dailyId,
  }).then((data) => data.dataValues.id);
}

export async function getAllByUserid(userId) {
  return Timeline.findAll({
    where: { userId },
  });
}

// 관리자용 api
export async function dropTimeline() {
  return Timeline.drop();
}

export async function getAll() {
  return Timeline.findAll();
}
