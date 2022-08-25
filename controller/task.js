import {} from "express-async-errors";
import * as taskRepository from "../data/task.js";

export async function getAll(req, res) {
  const data = await taskRepository.getAll();
  res.status(200).json(data);
}
