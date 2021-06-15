const Router = require("express").Router();

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const {
  getCategoryById,
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");

Router.param("userId", getUserById);
Router.param("categoryId", getCategoryById);

Router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

Router.get("/category/:categoryId", getCategory);
Router.patch(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);
Router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

Router.get("/categories", getAllCategories);

module.exports = Router;
