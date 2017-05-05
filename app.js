var express = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
flash       = require("connect-flash"),
passport    = require("passport"),
LocalStrategy = require("passport-local"),
User        = require("./models/user"),
methodOverride = require("method-override")



// REQUIRING Routes

var indexRoutes      = require("./routes/index"),
    reports			 = require("./routes/reports")
    

var url              = process.env.DATABASEURL || "mongodb://localhost/dline"
mongoose.Promise     = global.Promise;
mongoose.connect(url);
//mongoose.connect("mongodb://shaz13:a998132656@ds135680.mlab.com:35680/dline");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// PASSPORT CONFIGURATION

app.use(require("express-session")({
	secret: "Its Godsense",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport configurations
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// USING Routes

app.use("/", indexRoutes);
app.use("/reports", reports);
function isLoggedIn(res, req, next){
if(req.isAuthenticated()){
  return next();
}
res.redirect("/login");

}


//LISTENING THE PORT 
app.listen(process.env.PORT || 3000, function(){
  console.log("D-line server listening on port %d in %s mode", this.address().port, app.settings.env);
});


