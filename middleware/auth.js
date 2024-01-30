import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as userRepository from "../data/user.js";
import * as slackWebHock from "../slackWebHock.js";

const AUTH_ERROR = { error: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    const error = `Header 내 token 이 존재하지 않는 비정상적인 요청(${authHeader})`;
    const check = `- xcode authorization 반영 코드 확인 필요`
    slackWebHock.post(req.method, req.originalUrl, 401, "/middleware/auth.js (isAuth)", `${error}\ncheck\n${check}`);
    console.log("Header 내 token 이 존재X");
    return res.status(401).json(AUTH_ERROR); // header 내 token 정보가 없는 경우
  }

  // header 에서 jwt verify 후 얻은 id를 통해 user 를 찾는다
  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      if (req.originalUrl != "/syncLog") {
        const error = `token 정보를 읽을 수 없습니다(${authHeader})`;
        const check = `- token이 만료된 경우 (정상)\n- python jsonwebtoken 라이브러리, node.js config.jwt.secretKey 코드 확인 필요`;
        slackWebHock.post(req.method, req.originalUrl, 401, "/middleware/auth.js (isAuth)", `${error}\ncheck\n${check}`);
      }
      console.log("jwt 정보가 이상");
      return res.status(401).json(AUTH_ERROR); // jwt 정보가 이상한 경우
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      const error = `userId: ${decoded.id}값에 해당하는 유저가 존재하지 않습니다.`;
      const check = `- SELECT * FROM titi.users WHERE id = ${decoded.id}; 확인 필요\n - /controller/auth.js signup: userRepository.createUser 확인 필요\n - /controller/auth.js login: userRepository.findByUsername 확인 필요`;
      slackWebHock.post(req.method, req.originalUrl, 401, "/middleware/auth.js (isAuth)", `${error}\ncheck\n${check}`);
      console.log(`id: ${decoded.id} 해당유저 존재X`);
      return res.status(401).json(AUTH_ERROR); // 해당 유저가 없는 경우
    }
    req.userId = user.id;
    req.token = token;
    console.log(`User(${user.id})`);
    next();
  });
};
