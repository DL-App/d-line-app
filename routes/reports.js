var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,  function(req, res){
console.log("Route clicked");
    res.render("reports");
});

module.exports = router;