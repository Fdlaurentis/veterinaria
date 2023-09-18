const { DataTypes } = require("sequelize");
const { db } = require("../database/db");

exports.Recipe = db.define("recipe", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  medicine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recipe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
