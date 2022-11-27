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

export async function updateTimelineByDailyId(dailyId, localDaily) {
  return Timeline.findOne({
    where: { dailyId },
  })
    .then((timeline) => {
      timeline.time0 = localDaily.timeline[0];
      timeline.time1 = localDaily.timeline[1];
      timeline.time2 = localDaily.timeline[2];
      timeline.time3 = localDaily.timeline[3];
      timeline.time4 = localDaily.timeline[4];
      timeline.time5 = localDaily.timeline[5];
      timeline.time6 = localDaily.timeline[6];
      timeline.time7 = localDaily.timeline[7];
      timeline.time8 = localDaily.timeline[8];
      timeline.time9 = localDaily.timeline[9];
      timeline.time10 = localDaily.timeline[10];
      timeline.time11 = localDaily.timeline[11];
      timeline.time12 = localDaily.timeline[12];
      timeline.time13 = localDaily.timeline[13];
      timeline.time14 = localDaily.timeline[14];
      timeline.time15 = localDaily.timeline[15];
      timeline.time16 = localDaily.timeline[16];
      timeline.time17 = localDaily.timeline[17];
      timeline.time18 = localDaily.timeline[18];
      timeline.time19 = localDaily.timeline[19];
      timeline.time20 = localDaily.timeline[20];
      timeline.time21 = localDaily.timeline[21];
      timeline.time22 = localDaily.timeline[22];
      timeline.time23 = localDaily.timeline[23];
      return timeline.save();
    })
    .then((data) => data.dataValues.id);
}

// 관리자용 api
export async function dropTimeline() {
  return Timeline.drop();
}

export async function getAll() {
  return Timeline.findAll();
}
