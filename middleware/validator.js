import { validationResult } from "express-validator";
import * as slackWebHock from "../slackWebHock.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  slackWebHock.post(400, req.url, "/middleware/validator.js", `Invalid ${errors.array()[0].param}`);
  return res.status(400).json({ error: `Invalid ${errors.array()[0].param}` });
};
