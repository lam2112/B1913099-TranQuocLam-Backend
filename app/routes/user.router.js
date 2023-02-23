const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

router.route("/").get(users.showUsers).post(users.create);

router
  .route("/:id")
  .get(users.findOneUser)
  .put(users.updateUser)
  .delete(users.deleteUser);

router.route("/role/all").get(users.findRoleUser);

router.route("/login/user").get(users.checkUser);

module.exports = router;
