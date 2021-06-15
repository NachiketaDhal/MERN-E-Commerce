const Router = require("express").Router();

const {
  getUser,
  getUserById,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

Router.param("userId", getUserById);

Router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
Router.patch("/user/:userId", isSignedIn, isAuthenticated, updateUser);

Router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = Router;
