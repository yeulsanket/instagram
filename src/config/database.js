const mongoose = require("mongoose");


async function mongodbconnect(){
    await mongoose.connect(process.env.MONGO_URI).then(console.log("database connectetd properly "))
}

module.exports = mongodbconnect