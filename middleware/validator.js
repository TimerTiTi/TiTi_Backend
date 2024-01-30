import { validationResult } from "express-validator";
import * as slackWebHock from "../slackWebHock.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const error = `validator 오류(${errors.array()[0].param})`;
  const check = `- username length > 5 & 중국어 X, password length > 5, email: email 형식 확인\n- /router/auth.js validateCredential & validateSignup 코드 확인\n- python express-validator 라이브러리 확인`;
  slackWebHock.post(req.method, req.originalUrl, 400, "/middleware/validator.js (validate)", `${error}\ncheck\n${check}`);
  return res.status(400).json({ error: `Invalid ${errors.array()[0].param}` });
};
