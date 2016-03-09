var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    index = require('./routes/index'),
    passport = require('passport'),
    GoodreadsStrategy = require('passport-goodreads').Strategy,
    auth = require('./auth');
    User = require('./models/userModel')

mongoose.connect('mongodb://localhost/bookquest');

var app = express();

// Configuration
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));;
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());


app.use(session({ 
  secret: 'Yo. A secret.',
  cookie:{},
  resave: false,
  saveUninitialized: false }));

// Routes
// Home Page
app.get('/', index.home);

//Gets
app.get('/location', index.location) //By ID?
app.get('/login', index.login)

//Posts
app.post('/addLocation', index.addLocation);
app.post('/editLocation', index.editLocation)
app.post('/deleteLocation', index.deleteLocation);

//Goodreads login code
app.get('/auth/goodreads', passport.authenticate('goodreads'), function(req,res){console.log("Login in.")});
app.get('/auth/goodreads/callback',
  passport.authenticate('goodreads', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoodreadsStrategy({
  consumerKey: auth.goodreads.APP_ID,
  consumerSecret: auth.goodreads.APP_SECRET,
  callbackURL: auth.goodreads.CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("Reaching authentication function.")
    User.findOne({ goodreadsId: profile.id }, function (err, user) {
      if (user){
        return done(err, user);
      }
      else{
        user = new User({goodreadsId:profile.id})
        user.save(function(err){
          if(err) {
            console.log(err);  // handle errors!
            return done(err)
          } 
          else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));

app.listen(3000);
