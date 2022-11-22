import {} from "express-async-errors";
import * as timelineRepository from "../data/timeline.js";

export async function getTimelines(req, res) {
  console.log(req.userId);
  const data = await timelineRepository.getAllByUserid(req.userId);
  res.status(200).json(data);
}

// master
export async function getAll(req, res) {
  const data = await timelineRepository.getAll();
  res.status(200).json(data);
}
