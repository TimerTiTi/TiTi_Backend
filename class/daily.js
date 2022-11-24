export class Daily {
  constructor(dailyObject) {
    this.day = this.swiftToDate(dailyObject.day);
    this.maxTime = dailyObject.maxTime;
    this.tasks = dailyObject.tasks;
    this.timeline = dailyObject.timeline;
    this.taskHistorys = dailyObject.taskHistorys
      ? dailyObject.taskHistorys
      : null;
    this.status = !!dailyObject.status == true ? dailyObject.status : null;
  }

  swiftToDate(ti) {
    return new Date(ti * 1000 + 978307200000);
  }
}
