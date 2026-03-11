const express = require("express")
const cookieParser = require("cookie-parser")

const Authrouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", Authrouter)
app.use("/api/post", postRouter)

module.exports = app