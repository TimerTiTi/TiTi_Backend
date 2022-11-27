import { sequelize } from "../db/database.js";
import SQ from "sequelize";
import { User } from "./user.js";
import { Daily } from "./daily.js";
import moment from "moment";

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
Task.belongsTo(User);
Task.belongsTo(Daily);
