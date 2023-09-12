const express = require("express");
const cors = require("cors");

const { db } = require("../database/db");
const { userRouter } = require("../routes/user.router");
const { Doctors } = require("./Doctors.model");
const { Users } = require("./Users.model");
const { Record } = require("./record.model");

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
