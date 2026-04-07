const express = require("express")
const dotenv = require("dotenv")
dotenv.config()


const app = express()
app.use(express.json())

const cors = require("cors")
app.use(cors())

const routes = require("./routes/index")
app.use("/api", routes)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})