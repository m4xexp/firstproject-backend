const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  token: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  point: {
    type: Number,
  },
});

module.exports = mongoose.model("user", userSchema);
