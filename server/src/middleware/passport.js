var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');

module.exports =function(passport) {
    
    passport.use(new FacebookStrategy(
        {

            clientID: config.facebookID,
            clientSecret: config.facebookSecret,
            callbackURL: `http://${ config.url }:${ config.port }/auth/facebook/callback`,
            profileFields: [ "id", "displayName", "photos", "email", "birthday" ]

        },
        ( accessToken, refreshToken, profile, done ) => {

        console.info( `${ profile.displayName } logged in ${ profile.id }`)
      	done(null, profile);
        
      }
    ));

    passport.serializeUser( (user, done) => {

        done(null, user);

    });

    passport.deserializeUser( (id, done) => {

        done( null, id );

    });

}
