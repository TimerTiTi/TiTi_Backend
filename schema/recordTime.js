import { sequelize } from "../db/database.js";
import SQ from "sequelize";
import { User } from "./user.js";
import moment from "moment";

const DataTypes = SQ.DataTypes;

export const RecordTime = sequelize.define("recordTime", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  settedTimerTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  settedGoalTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  savedSumTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  savedTimerTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  savedStopwatchTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  savedGoalTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recordingMode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recordTask: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recordTaskFromTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recording: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  recordStartAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("recordStartAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
  recordStartTimeline: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("createdAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("updatedAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
});
RecordTime.belongsTo(User);
