const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const db = require("../config/db")
db.connect().catch(err => console.log(err))

async function login(body, res) {
    let username = body?.username
    let password = body?.password
    if (password == undefined || username == undefined) {
        return res.status(400).json({
            status: false,
            message: "Username and Password are required"
        })
    }
    if (username.trim() == "") {
        return res.status(400).json({
            status: false,
            message: "Username cannot be empty"
        })
    }
    if (username.length > 20) {
        return res.status(400).json({
            status: false,
            message: "Username cannot be longer than 20 characters"
        })
    }
    let usernameRegex = /^[a-zA-Z0-9_]+$/
    if (!usernameRegex.test(username)) {
        return res.status(400).json({
            status: false,
            message: "Username can only contain alphanumeric characters and underscores"
        })
    }
    if (password.trim() == "") {
        return res.status(400).json({
            status: false,
            message: "Password cannot be empty"
        })
    }
    connection = db.getConnection()
    collection = connection.db("ExpenseTracker").collection("users")
    user = await collection.findOne({ username: username })
    if (!user) {
        return res.status(404).json({
            status: false,
            message: "Username Not Found"
        })
    }
    passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.status(401).json({
            status: false,
            message: "Incorrect Password"
        })
    }

    token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: "30d" })

    return res.json({
        status: true,
        message: "Login Successful",
        token: token
    })
}

async function loginToken(body, res) {
    let token = body?.token
    if(token == null){
        return res.status(400).json({
            status: false,
            message: "Token Required"
        })
    }
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        connection = db.getConnection()
        collection = connection.db("ExpenseTracker").collection("users")
        user = await collection.findOne({ username: decoded.username })
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User Not Found"
            })
        }
        return res.json({
            status: true,
            message: "Token Valid",
            username: decoded.username
        })
    }
    catch (err) {
        return res.status(401).json({
            status: false,
            message: "Token Invalid or Expired"
        })
    }
} 
module.exports = { login, loginToken }


