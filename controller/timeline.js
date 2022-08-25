import {} from "express-async-errors";
import * as timelineRepository from "../data/timeline.js";

export async function getAll(req, res) {
  const data = await timelineRepository.getAll();
  res.status(200).json(data);
}
