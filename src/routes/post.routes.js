const express = require("express")
const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({ storage })

const postRouter = express.Router()

const postController = require("../controller/post.controller")

postRouter.post("/", upload.single("image"), postController.Createpost);
postRouter.get("/",postController.getpostcontroler);
postRouter.get("/details/:postid",postController.getpostdeatails)
module.exports = postRouter;