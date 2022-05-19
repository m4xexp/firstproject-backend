require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const cors = require("cors");
const app = express();

var jwt = require("jsonwebtoken");

const User = require("../models/user");
const bcryptjs = require("bcryptjs");

app.use(express.json());
app.use(cors());

app.get("/", async function (req, res) {
  res.send({
    msg: "hello",
  });
});

app.get("/find", async function (req, res) {
  const { username, email, imgUrl, password, difficulty, point } = req.body;
  const res = await User.findOne({
    username,
  });
  res.send({
    msg: res.imgUrl,
  });
});

// Register
app.post("/register", async (req, res) => {
  // register logic
  try {
    // Get user input
    const { username, email, imgUrl, password, difficulty, point } = req.body;

    // Valudate user input
    if (!(username && email && password)) {
      res.status(400).send({ msg: "All input is require" });
    }

    // check if user already exists
    const oldUser = await User.findOne({ email, username });

    if (oldUser) {
      return res.status(409).send({ msg: "User already exists" });
    }

    // Encrypt user password
    let encryptedPassword = await bcryptjs.hash(password, 10);

    // create user in database
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      imgUrl,
      password: encryptedPassword,
      difficulty,
      point,
    });

    // create token
    var token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    // save user tokenKey
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (error) {
    console.log("error");
  }
});

// Login
app.post("/login", async (req, res) => {
  // login logic
});

app.listen(4000, function () {
  console.log("Runnning on port 4000");
});

module.exports = app;
