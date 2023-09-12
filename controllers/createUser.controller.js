const { Users } = require("../models/Users.model");

const bcrypyjs = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { userName, role, password } = req.body;

    const passwordHash = await bcrypyjs.hash(password, 8);

    const user = await Users.findOne({
      where: {
        userName,
      },
    });

    if (user) {
      return res.status(403).json({
        status: "error",
        message: `The user ${userName}, already exists`,
      });
    } else {
      const newUser = await Users.create({
        userName,
        role,
        password: passwordHash,
      });

      newUser.password = undefined;

      return res.status(201).json({
        status: "succes",
        message: `The user ${userName}, was created successfully`,
        newUser,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error,
    });
  }
};

exports.findAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      where: {
        status: true,
      },
    });

    res.status(200).json({
      status: "succes",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

exports.findUserById = async (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: "succes",
    user,
  });
};

exports.updateUser = (req, res) => {
  res.status(200).json({
    status: "succes",
  });
};

exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: "succes",
  });
};
