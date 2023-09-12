const { Router } = require("express");
const { check } = require("express-validator");

const {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
} = require("../controllers/createUser.controller");

const { validExistUserById } = require("../middlewares/user.middleware");

const { validateFields } = require("../utils/validateFileds");

const router = Router();

router.post(
  "/",
  [
    check("userName", "The userName must be mandatory").not().isEmpty(),
    check("password", "The password must be mandatory").not().isEmpty(),
    check("role", "The role must be mandatory").not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.get("/", findAllUsers);

router.get("/:id", validExistUserById, findUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = {
  userRouter: router,
};
