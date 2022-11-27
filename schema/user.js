import { sequelize } from "../db/database.js";
import SQ from "sequelize";
import moment from "moment";

const DataTypes = SQ.DataTypes;

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
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
