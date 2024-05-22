const express = require("express");
const passport = require("passport");
const { Signup } = require("../controller/authcontroller.js");
const { Login } = require("../controller/authcontroller.js");
const { userModel } = require("../model/usermodel.js");
require("dotenv").config();

const router = express.Router();

router
  .post("/signup", Signup)
  .post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/auth/loginfail" }),
    Login
  );

//==========Google Routes= ===============
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_CLIENT_URL
        : process.env.DEVELOPMENT_CLIENT_URL
    }/googleredirect`,
    failureRedirect: "/googleloginfail",
  })
);

router.get(
  "/google/success",

  async (req, res) => {
    if (req.user) {
      const total_users = await userModel.find({}).exec();
      total_users.forEach((user) => {
        user["password"] = undefined;
      });
      res
        .status(200)
        .json({ success: true, user: req.user, totalUsers: total_users });
    } else {
      res.status(401).send({ message: "unauthorized" });
    }
  }
);
router.get("/google/authfail", (req, res) => {
  res.status(401).json({ message: "Authentication failed." });
});

// login auth fails

router.get("/loginfail", (req, res) => {
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

module.exports = { AuthRouter: router };
