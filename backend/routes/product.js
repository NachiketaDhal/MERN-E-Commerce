const Router = require("express").Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getProduct,
  getProductById,
  createProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");

Router.param("userId", getUserById);
Router.param("productId", getProductById);

Router.get(
  "/product/:productId",
  // isSignedIn,
  // isAuthenticated,
  // isAdmin,
  getProduct
);
Router.get("/product/photo/:productId", photo);

Router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

Router.patch(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

Router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

Router.get("/products", getAllProducts);
Router.get("/products/categories", getAllUniqueCategories);

module.exports = Router;
