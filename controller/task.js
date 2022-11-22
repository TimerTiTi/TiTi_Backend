import {} from "express-async-errors";
import * as taskRepository from "../data/task.js";

export async function getTasks(req, res) {
  console.log(req.userId);
  const data = await taskRepository.getAllByUserid(req.userId);
  res.status(200).json(data);
}

// master: getAll
export async function getAll(req, res) {
  const data = await taskRepository.getAll();
  res.status(200).json(data);
}
