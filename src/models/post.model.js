const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  
  caption: {
    type: String,
    default: ""
  },

  img_url: {
    type: String,
    default: ""
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }

}, {
  timestamps: true
})

const Post = mongoose.models.post || mongoose.model("post", postSchema)

module.exports = Post