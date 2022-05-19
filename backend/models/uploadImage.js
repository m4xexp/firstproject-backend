const mongoose = require("mongoose");

const uploadImageSchema = new mongoose.Schema({
  imgUrl: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("uploadImage", uploadImageSchema);
