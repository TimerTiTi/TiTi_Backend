import { sequelize } from "../db/database.js";
import SQ from "sequelize";
import { User } from "./user.js";

const DataTypes = SQ.DataTypes;

export const Daily = sequelize.define("daily", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  day: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  maxTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timeline: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  tasks: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  taskHistorys: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});
Daily.belongsTo(User);
