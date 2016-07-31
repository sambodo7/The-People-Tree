var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');

module.exports =function(passport) {
    
    passport.use(new FacebookStrategy({
        clientID: config.facebookID,
        clientSecret: config.facebookSecret,
        callbackURL: "http://localhost:8080/leaf"
      },
      function(accessToken, refreshToken, profile, done) {
        
      }
    ));
}
