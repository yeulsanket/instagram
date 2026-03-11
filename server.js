require('dotenv').config()

const app = require("./src/app")
const connecttodb =require("./src/config/database")

app.listen(3000, ()=>{
    console.log("Server is started on port 3000")
})
connecttodb();