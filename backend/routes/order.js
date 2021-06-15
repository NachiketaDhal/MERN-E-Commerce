const Router = require("express").Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOredrPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
} = require("../controllers/order");

Router.param("userId", getUserById);
Router.param("orderId", getOrderById);

Router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOredrPurchaseList,
  updateStock,
  createOrder
);

Router.get(
  "order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

Router.get(
  "order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

Router.patch(
  "order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = Router;
