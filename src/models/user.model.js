const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  bio: {
    type: String,
    default: ""
  },

  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/iic4b5ykw/default-image.jpg?updatedAt=1772810888304"
  }

}, {
  timestamps: true
});

const usermodel = mongoose.model("user", userSchema);

module.exports = usermodel;