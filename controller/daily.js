import {} from "express-async-errors";

export async function createDailys(req, res) {
  const dailys = req.body;
  dailys.forEach((daily) => {
    console.log(daily);
    const taskHistorys = daily.taskHistorys;

    if (taskHistorys) {
      Object.keys(taskHistorys).forEach((key) => {
        const taskName = key;
        taskHistorys[key].forEach((taskHistory) => {
          console.log(
            `${taskName}: ${taskHistory["startDate"]} ~ ${taskHistory["endDate"]}`
          );
        });
      });
    }
  });
  res.sendStatus(201);
}
