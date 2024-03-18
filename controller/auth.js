import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { } from "express-async-errors";
import * as userRepository from "../data/user.js";
import { config } from "../config.js";
import nodemailer from "nodemailer";
import * as slackWebHock from "../slackWebHock.js";

const INVALID_AUTH = { error: "Invalid Auth" };

export async function signup(req, res) {
  const { username, password, email } = req.body;
  // username check
  const foundUsername = await userRepository.findByUsername(username);
  // email check
  const foundEmail = await userRepository.findByEmail(email);
  if (foundUsername || foundEmail) {
    return res.status(409).json({ error: "user infos must be unique" });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const id = await userRepository.createUser({
    username,
    password: hashed,
    email,
  });
  const token = createJwtToken(id);
  console.log(`CREATE User(${id})`);

  //  let transporter = nodemailer.createTransport({
  //    // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
  //    service: "gmail",
  //    // host를 gmail로 설정
  //    host: "smtp.gmail.com",
  //    port: 587,
  //    secure: false,
  //    auth: {
  //      // Gmail 주소 입력, 'testmail@gmail.com'
  //      user: config.gmail.user,
  //      // Gmail 패스워드 입력
  //      pass: config.gmail.pass,
  //    },
  //  });
  //
  //  let info = await transporter.sendMail({
  //    // 보내는 곳의 이름과, 메일 주소를 입력
  //    from: `"TimerTiTi" <${config.gmail.user}>`,
  //    // 받는 곳의 메일 주소를 입력
  //    to: email,
  //    // 보내는 메일의 제목을 입력
  //    subject: "TimerTiTi 베타테스트v0.3 회원가입 안내",
  //    // 보내는 메일의 내용을 입력
  //    // text: 일반 text로 작성된 내용
  //    // html: html로 작성된 내용
  //    text:
  //      "TimerTiTi 베타테스트v0.3 회원가입을 해주셔서 감사합니다.\n" +
  //      "회원가입된 정보는 다음과 같습니다.\n\n" +
  //      `username: ${username}\n` +
  //      `password: ${password}\n\n` +
  //      "회원가입된 정보는 기록동기화를 위한 사용자 식별을 위한 정보이며, 추후 8.0 업데이트의 Google, Apple 로그인 서비스가 구현되기 전까지 존재합니다.\n" +
  //      "어떠한 상업적 목적으로도 개인정보가 사용되지 않음을 알려드립니다.\n\n" +
  //      "현재 베타테스트v0.3를 통해 자유롭게 Mac, iPad, iPhone 간의 기록을 동기화하실 수 있습니다.\n\n" +
  //      "- 동기화 방법 안내 -\n\n" +
  //      "1. 동기화를 하고자 하시는 Device 에서 Setting - TiTi 연구소 - Login 을 통해 로그인 합니다.\n" +
  //      "2. 기록을 진행하였던 Device 의 경우 Setting - TiTi 연구소 - Sync Dailys - Sync Now 를 통해 백업합니다.\n" +
  //      "3. 기록을 받고자 하는 Device 의 경우 동일하게 Setting - TiTi 연구소 - Sync Dailys - Sync Now 를 통해 동기화하실 수 있습니다.\n\n" +
  //      "- 동기화 로직 안내 -\n\n" +
  //      "- 현재 Device 의 모든 Daily 정보가 upload 된 후 전체 Daily 정보를 받아와 저장합니다.\n" +
  //      "- 같은 날의 Daily 정보가 겹치는 경우 TaskHistorys 내 startDate 값이 큰(최신) Daily로 대치됩니다. TaskHistorys 값이 없는 경우 (과거 기록) TotalTime 값이 큰 Daily로 대치됩니다.\n" +
  //      "- Timer & Stopwatch 화면에 표시되는 누적시간, 타이머, 스톱워치, 남은시간의 경우 가장 최신에 생성된 기록에 따라 반영되므로 꼭 사용하셨던 Device 에서 Sync Now 하신 후 다음 Device 에서 Sync Now 하시기 바랍니다.\n\n" +
  //      "※ 사용하시기 전 Setting - Backup : 저장된 JSON 파일 을 통해 기록들을 저장해두시기 바랍니다.\n" +
  //      "※ 꼭 사용하시던 Device 에서 동기화를 하신 후 이어서 사용하실 Device 에서 동기화를 하시기 바랍니다.\n" +
  //      "※ 서버문제가 발생할 경우 동기화 기능만 제한되며 기록들은 그대로 유지됩니다.\n" +
  //      "※ 서버 문제로인해 사용불가할 경우 Instagram - @study_withtiti 계정을 통해 소식을 업데이트 하겠습니다.\n\n" +
  //      "- FDEE -",
  //  });
  //
  //  console.log("Message sent: <%s>", email);
  console.log("Message send passed");
  res.status(201).json({ token, id, username, email });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    const error = `users 내 존재하지 않는 username으로 로그인 요청(${username})`;
    const check = `- SELECT * FROM titi.users WHERE username="${username}"; 확인 필요`;
    slackWebHock.post(req.method, req.originalUrl, 404, "/controller/auth.js (login)", `${error}\ncheck\n${check}`);
    return res.status(404).json(INVALID_AUTH);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const error = `user(${user.id}) 패스워드값이 동일하지 않음(${password})`;
    const check = `- SELECT * FROM titi.users WHERE id = ${user.id}; 확인 필요`;
    slackWebHock.post(req.method, req.originalUrl, 404, "/controller/auth.js (login)", `${error}\ncheck\n${check}`);
    return res.status(404).json(INVALID_AUTH);
  }
  // success
  const token = createJwtToken(user.id);
  res.status(200).json({ token, id: user.id, username, email: user.email });
}

// username 또는 email에 해당하는 유저 확인
export async function checkUser(req, res) {
  const username = req.query.username;
  const email = req.query.email;

  if (email && username) {
    const user = await userRepository.findByUsernameEmail({
      username: username,
      email: email
    });
    if (user) {
      res.status(200).json({ data: true, message: "exist" });
    } else {
      res.status(404).json({ data: false, message: "not exist" });
    }
  } else if (username) {
    const user = await userRepository.findByUsername(username);
    if (user) {
      res.status(200).json({ data: true, message: "exist" });
    } else {
      res.status(404).json({ data: false, message: "not exist" });
    }
  } else {
    res.status(400).json({ data: false, message: "wrong request" });
  }
}

// password 업데이트
export async function updatePassword(req, res) {
  const { username, email, newPassword } = req.body;
  const user = await userRepository.findByUsernameEmail({
    username: username,
    email: email
  });

  if (!user) {
    return res.status(404).json({ data: false, message: "not exist" });
  }

  // update password
  const hashed = await bcrypt.hash(newPassword, config.bcrypt.saltRounds);
  const updated = await userRepository.updatePassword({
    username: username,
    email: email,
    password: hashed
  });
  if (updated) {
    slackWebHock.post(req.method, req.originalUrl, 200, "비밀번호 재발급", `user(${user.id})`);
    return res.status(200).json({ data: true, message: "update success" });
  } else {
    return res.status(500).json({ data: false, message: "update fail" });
  }
}

// jwt 내 id 값 저장
function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

// master
export async function getAll(req, res) {
  const data = await userRepository.getAll();
  res.status(200).json(data);
}
