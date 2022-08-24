export class Daily {
  constructor(dailyObject) {
    this.day = this.swiftToDate(dailyObject.day);
    console.log(this.day.toString());
    this.maxTime = dailyObject.maxTime;
    this.tasks = dailyObject.tasks;
    this.timeline = dailyObject.timeline;
    this.taskHistorys = dailyObject.taskHistorys
      ? dailyObject.taskHistorys
      : null;
  }

  swiftToDate(ti) {
    return new Date(ti * 1000 + 978307200000);
  }
}
