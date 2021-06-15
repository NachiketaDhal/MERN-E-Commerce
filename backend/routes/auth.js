const express = require("express");
const Router = express.Router();
const { check, body } = require("express-validator");

const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

Router.post(
  "/signup",
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name should be at least of 3 characters"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password should be at least of 5 characters"),
  signup
);

Router.post(
  "/signin",
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password should be at least of 5 characters"),
  signin
);

Router.get("/signout", signout);

Router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = Router;
