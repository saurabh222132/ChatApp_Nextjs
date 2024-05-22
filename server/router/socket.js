const express = require("express");
const router = express.Router();

router.get("/newuser", (req, res) => {
  res.send("hello new  User");
});

module.exports = router;
