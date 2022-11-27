import { sequelize } from "../db/database.js";
import SQ from "sequelize";
import { User } from "./user.js";
import moment from "moment";

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
    get() {
      return (
        moment(this.getDataValue("day")).utc().format("YYYY-MM-DDTHH:mm:ss") +
        "Z"
      );
    },
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
  status: {
    // uploaded, edited, created
    type: DataTypes.STRING,
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
Daily.belongsTo(User);
