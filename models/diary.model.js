const { DataTypes } = require("sequelize");
const { db } = require("../database/db");

exports.Diary = db.define("diary", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cita: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: true
  }
});
