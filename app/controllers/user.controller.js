const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.userName) {
    return next(new ApiError(400, "user name can not be empty"));
  }

  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};

exports.showUsers = async (req, res, next) => {
  let listUsers = [];

  try {
    const userService = new UserService(MongoDB.client);
    const { userName } = req.query;
    if (userName) {
      listUsers = await userService.findByName(userName);
    } else {
      listUsers = await userService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Error when get information users")
    );
  }
  
  return res.send(listUsers);
};

exports.findOneUser = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send(document);

  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving user with id=${req.params.id}`)
    );
  }
};

exports.updateUser = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.updateUser(req.params.id, req.body);

    if (!document) {
      return next(new ApiError(404, "User not found"));
    }

    return res.send({ message: "User was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating user with id=${req.params.id}`)
    );
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.deleteUser(req.params.id);

    if (!document) {
      return next(new ApiError(404, "User not found"));
    }

    return res.send({ message: "User was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete user with id=${req.params.id}`)
    );
  }
};



exports.findRoleUser = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const documents = await userService.findRoleUser();

    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving contacts")
    );
  }
};

exports.checkUser = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.checkLogin(req.body)

    if (!document) {
      return next(new ApiError(201, "User do not exist"));
    }

    return res.send(document);

  } catch (error) {
    return next(
      new ApiError(500, `Server error while checking`)
      );
  }
};
