var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');

module.exports =function( passport ) {
    
    passport.use( new FacebookStrategy(
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
    ) );

    // Use the GoogleStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a token, tokenSecret, and Google profile), and
    //   invoke a callback with a user object.
    passport.use( new GoogleStrategy(
        {

            clientID: config.googleID,
            clientSecret: config.googleSectet,
            callbackURL: `http://${ config.url }:${ config.port }/auth/google/callback`,

        },
        ( accessToken, refreshToken, profile, done ) => {

            console.info( `${ profile.displayName } logged in ${ profile.id }`)
            done(null, { id: profile.id, name: profile.displayName } );
  
        }
    ) ) ;

    passport.serializeUser( ( user, done ) => done( null, user ) );

    passport.deserializeUser( ( id, done ) => done( null, id ) );

}
