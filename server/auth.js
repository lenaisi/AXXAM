const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback' // URL de callback après l'authentification
},
(accessToken, refreshToken, profile, done) => {
  // Callbackk appelé après l'authentification réussie avec Google
  const googleUser = {
    email: profile._json.email,
    name: profile._json.name,
  };

  console.log(" googleUser : ", googleUser);
  return done(null, googleUser); // Transmet les informations de l'utilisateur à Passport.js
}));

passport.serializeUser((user, done) =>{
    done(null, user)
});
passport.deserializeUser((user, done) =>{
    done(null, user)
});
