export class Daily {
  constructor(dailyObject) {
    // Object.assign(this, dailyObject);
    this.day = dailyObject.day;
    this.maxTime = dailyObject.maxTime;
    this.tasks = dailyObject.tasks;
    this.timeline = dailyObject.timeline;
    this.taskHistorys = dailyObject.taskHistorys
      ? dailyObject.taskHistorys
      : null;
  }

  print() {
    console.log(this.day);
    console.log(this.tasks);
    console.log(this.taskHistorys);
  }

  // const taskHistorys = daily.taskHistorys;

  // if (taskHistorys) {
  //   Object.keys(taskHistorys).forEach((key) => {
  //     const taskName = key;
  //     taskHistorys[key].forEach((taskHistory) => {
  //       console.log(
  //         `${taskName}: ${taskHistory["startDate"]} ~ ${taskHistory["endDate"]}`
  //       );
  //     });
  //   });
  // }
}
