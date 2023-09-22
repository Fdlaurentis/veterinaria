const express = require("express");
const cors = require("cors");

const { db } = require("../database/db");
const { userRouter } = require("../routes/user.router");
const { Doctors } = require("./doctors.model");
const { Users } = require("./users.model");
const { Record } = require("./record.model");
const { Diary } = require("./diary.model");
const { Client } = require("./client.model");
const { Pet } = require("./pet.model");
const { Recipe } = require("./recipe.model");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Path Routes
    this.paths = {
      users: "/api/v1/users",
      dotors: "/api/v1/doctors",
    };

    //Connect to db
    this.database();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, userRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log("Database authenticated"))
      .catch((error) => console.log(error));

    //relations
    //Uno a Uno
    Users.hasOne(Doctors);
    Doctors.belongsTo(Users);

    //Uno a Muchos
    Doctors.hasMany(Record, { foreignKey: "doctorId" });
    Record.belongsTo(Doctors);

    Doctors.hasMany(Diary, { foreignKey: "doctorId" });
    Diary.belongsTo(Doctors);

    Doctors.hasMany(Diary, { foreignKey: "doctorId" });
    Diary.belongsTo(Doctors);

    Client.hasMany(Diary, { foreignKey: "clientId" });
    Diary.belongsTo(Client);

    Client.hasMany(Pet, { foreignKey: "clientId" });
    Pet.belongsTo(Client);

    Pet.hasMany(Record, { foreignKey: "petId" });
    Record.belongsTo(Pet);

    Recipe.hasMany(Record, { foreignKey: "recipeId" });
    Record.belongsTo(Recipe);

    //Sync hacia BBDD
    db.sync()
      .then(() => console.log("Database Synced"))
      .catch((error) => console.log(error));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on the port", this.port);
    });
  }
}

module.exports = Server;
