import { where } from "sequelize";
import { User } from "../schema/user.js";

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
}

export async function findById(id) {
  return User.findByPk(id);
}

export async function findByUsername(username) {
  return User.findOne({ where: { username: username } });
}

export async function findByEmail(email) {
  return User.findOne({ where: { email: email } });
}

export async function updatePassword({ username, email, password }) {
  return User.update({ password: password }, { where: { username: username, email: email } });
}

// 관리자용 api
export async function dropUser() {
  return User.drop();
}

export async function getAll() {
  return User.findAll();
}
