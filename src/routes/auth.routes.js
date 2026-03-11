const express = require("express");
const Authrouter = express.Router();
const { register, login } = require("../controller/auth.controler");

Authrouter.post("/register", register);

Authrouter.post("/login", login);

module.exports = Authrouter;