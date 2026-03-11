const Post = require("../models/post.model");
const ImageKit = require("imagekit");
const jwt = require("jsonwebtoken");

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// ================= CREATE POST =================
const Createpost = async (req, res) => {
  try {
    const { caption } = req.body;

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Please login first"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
      return res.status(400).json({
        message: "User ID not found in token"
      });
    }

    let imageUrl = "";

    if (req.file) {
      const base64File = req.file.buffer.toString("base64");

      const uploadResponse = await imagekit.upload({
        file: base64File,
        fileName: req.file.originalname,
        folder: "/posts"
      });

      imageUrl = uploadResponse.url;

    } else {
      return res.status(400).json({
        message: "Image is required"
      });
    }

    const newPost = await Post.create({
      caption: caption || "",
      img_url: imageUrl,
      user: userId
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost
    });

  } catch (error) {

    console.log("Error creating post:", error);

    res.status(500).json({
      message: "Error creating post",
      error: error.message
    });
  }
};

// ================= GET ALL POSTS =================
const getpostcontroler = async (req, res) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Please login"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const posts = await Post.find({ user: userId });

    res.status(200).json({
      message: "Posts fetched successfully",
      totalPosts: posts.length,
      posts: posts
    });

  } catch (error) {

    console.log("Error fetching posts:", error);

    res.status(500).json({
      message: "Error fetching posts",
      error: error.message
    });
  }
};



// ================= GET SINGLE POST =================
const getpostdeatails = async (req, res) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access"
      });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    const postId = req.params.postid;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.status(200).json({
      message: "Post fetched successfully",
      post: post
    });

  } catch (error) {

    console.log("Error fetching post:", error);

    res.status(500).json({
      message: "Error fetching post",
      error: error.message
    });
  }
};



module.exports = {
  Createpost,
  getpostcontroler,
  getpostdeatails
};