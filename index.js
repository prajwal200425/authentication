const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const session = require("express-session");
const User = require("./models/user.js");

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/facebook");
}

const sessionOption = {
  secret: "superSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpOnly: true,
  },
};

app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get("/user" , async (req,res) => {
    let fakeUser = new User({
        email : "student1@gmail.com",
        username: "studOne",
    });

  let newUser = await  User.register(fakeUser , "@student25");

  res.send(newUser);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
