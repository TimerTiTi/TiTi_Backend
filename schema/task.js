import { sequelize } from "../db/database.js";
import SQ from "sequelize";
import { User } from "./user.js";
import { Daily } from "./daily.js";

const DataTypes = SQ.DataTypes;

export const Task = sequelize.define("task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  taskName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taskTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Task.belongsTo(User);
Task.belongsTo(Daily);
