import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as userRepository from "../data/user.js";
import { config } from "../config.js";

export async function signup(req, res) {
  const { username, password, email } = req.body;
  const found = await userRepository.findByUsernameAndEmail(username, email);
  if (found) {
    return res
      .status(409)
      .json({ error: `${username}: ${email} already exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    email,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, userId, username, email });
}

export async function getAll(req, res) {
  const data = await userRepository.getAll();
  res.status(200).json(data);
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}
