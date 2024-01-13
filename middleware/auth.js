import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as userRepository from "../data/user.js";
import * as slackWebHock from "../slackWebHock.js";

const AUTH_ERROR = { error: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    slackWebHock.post(401, req.url, "/middleware/auth.js", "Header 내 token 이 존재X");
    console.log("Header 내 token 이 존재X");
    return res.status(401).json(AUTH_ERROR); // header 내 token 정보가 없는 경우
  }

  // header 에서 jwt verify 후 얻은 id를 통해 user 를 찾는다
  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      slackWebHock.post(401, req.url, "/middleware/auth.js", "jwt 정보가 이상");
      console.log("jwt 정보가 이상");
      return res.status(401).json(AUTH_ERROR); // jwt 정보가 이상한 경우
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      slackWebHock.post(401, req.url, "/middleware/auth.js", `userId: ${decoded.id}값에 해당하는 유저 존재X`);
      console.log(`id: ${decoded.id} 해당유저 존재X`);
      return res.status(401).json(AUTH_ERROR); // 해당 유저가 없는 경우
    }
    req.userId = user.id;
    req.token = token;
    console.log(`User(${user.id})`);
    next();
  });
};
