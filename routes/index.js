const express = require("express");
const router = express.Router();

const powerToolsRoutes = require("./powerTools");
const handToolsRoutes = require("./handTools");
const passport = require("passport");

router.use("/", require("./swagger"));

router.use("/power-tools", powerToolsRoutes);
router.use("/hand-tools", handToolsRoutes);

//Base route for testing
router.get("/", (req, res) => {
  res.send("Welcome to the Tool Management API");
});

//Log in route
router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
});

module.exports = router;
