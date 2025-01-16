const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userSchema = require('../models/userModel');




require('dotenv').config(); 


passport.use( "google",
    new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        scope:["profile","email"],
        },
        async function(accessToken,refreshToken,profile,done){
            try {
                console.log(profile._json.email);
                let user = await userSchema.findOne({ email: profile._json.email });
                console.log(profile);
                console.log(user);
                if (!user) {
                  console.log("inside if ")
                  user = new userSchema({
                    name: profile.displayName,
                    email: profile._json.email,
                    imageURL: profile._json.picture
                  });
                  console.log("after that")
                  await user.save();
                  console.log("after save")
                }
                console.log(user);
                return done(null, user);
              } catch (err) {
                return done(err, false);
              }


        }
    )
);

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})