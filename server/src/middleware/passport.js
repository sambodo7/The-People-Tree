var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');

module.exports =function(passport) {
    
    passport.use(new FacebookStrategy({
        clientID: config.facebookID,
        clientSecret: config.facebookSecret,
        callbackURL: `http://${ config.url }:${ config.port }/auth/facebook/callback`
      },
      function(accessToken, refreshToken, profile, done) {

      	done(null, profile);
        
      }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        done( null, id );
});
}
