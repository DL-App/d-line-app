var express     = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
flash       = require("connect-flash"),
passport    = require("passport"),
LocalStrategy = require("passport-local"),
User        = require("./models/user"),
GoogleStrategy = require( 'passport-google-oauth2' ).Strategy,
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

passport.use(new GoogleStrategy({
    clientID:     '976909333672-2ok2uvpgsua0pppvm46badt11vfp4kok.apps.googleusercontent.com',
    clientSecret: '976909333672-2ok2uvpgsua0pppvm46badt11vfp4kok.apps.googleusercontent.com',
    callbackURL: "http://127.0.0.1:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));


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
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


