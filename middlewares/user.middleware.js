const { Users } = require("../models/Users.model");

exports.validExistUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Users.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `The user ID ${id} not found`,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      error,
    });
  }
};
