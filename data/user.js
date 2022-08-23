import { User } from "../schema/user.js";

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
}

export async function findById(id) {
  return User.findByPk(id);
}

export async function findByUsernameAndEmail(username, email) {
  return User.findOne({ where: { username: username, email: email } });
}
