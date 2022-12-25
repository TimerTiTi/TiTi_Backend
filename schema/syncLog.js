import { sequelize } from "../db/database.js";
import SQ from "sequelize";
import { User } from "./user.js";
import moment from "moment";

const DataTypes = SQ.DataTypes;

export const SyncLog = sequelize.define("syncLog", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dailysCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  uploadCount: {
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
SyncLog.belongsTo(User);
