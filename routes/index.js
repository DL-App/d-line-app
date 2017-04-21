var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

//root route
router.get("/", function(req, res){
console.log(req.user);
    res.render("home", {currentUser:req.user});
});
router.get("/demo", function(req, res){
   res.render("demo"); 
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to D-line, " + user.username);
           res.redirect("/"); 
        });
    });
});

 // Google login
 router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/demo',
                    failureRedirect : '/'
            }));




//show login form

router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {

     
          successRedirect:"/demo",
        
       
        failureRedirect: "/login"
        

    }), function(req, res){
console.log(req);
});





// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You are logged out!");
   res.redirect("/");
});



module.exports = router;