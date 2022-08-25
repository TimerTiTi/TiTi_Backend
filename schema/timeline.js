import { sequelize } from "../db/database.js";
import SQ from "sequelize";
import { User } from "./user.js";
import { Daily } from "./daily.js";

const DataTypes = SQ.DataTypes;

export const Timeline = sequelize.define("timeline", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  time0: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time3: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time4: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time5: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time6: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time7: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time8: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time9: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time10: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time11: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time12: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time13: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time14: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time15: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time16: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time17: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time18: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time19: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time20: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time21: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time22: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time23: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Timeline.belongsTo(User);
Timeline.belongsTo(Daily);
