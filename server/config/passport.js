const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { userModel } = require("../model/usermodel");
const bcrypt = require("bcrypt");
require("dotenv").config();

// ========================Local Strategy ===============================
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      console.log("Local Strategy Runs");
      await userModel.findOne({ email: email }).then((user, err) => {
        if (err) {
          constole.log("Error in local strategy");
          return done(err);
        }
        if (!user) {
          console.log("IN user no foundcase");
          return done(null, false, { message: "Incorrect username." });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            console.log("No. 3");
            return done(null, user);
          } else {
            console.log(" NO . 4");
            return done(null, false, { message: "Incorrect password." });
          }
        });
      });
    }
  )
);

// ============================== Passport Google OAuth2.0 Strategy  ===============================

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback", // here you have to put full URL of backend when deploy this site like : https://chat-app-nextjs.vercel.app/auth/google/callback

      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          const newuser = new userModel({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });

          newuser.save().then(() => {
            return console.log("new google user saved");
          });
          return done(null, newuser);
        } else return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// ======================== Serializer  and deserializer function =========================

passport.serializeUser((user, done) => {
  console.log("Serializer run");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id).then((user, err) => {
    console.log("Deserializer runs");
    done(err, user);
  });
});
