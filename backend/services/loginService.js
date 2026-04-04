const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const db = require("../config/db")
db.connect().catch(err => console.log(err))

async function login(body) {
    let username = body?.username
    let password = body?.password
    if (password == undefined || username == undefined) {
        return {
            status: false,
            message: "Username and Password are required"
        }
    }
    if (username.trim() == "") {
        return {
            status: false,
            message: "Username cannot be empty"
        }
    }
    if (username.length > 20) {
        return {
            status: false,
            message: "Username cannot be longer than 20 characters"
        }
    }
    let usernameRegex = /^[a-zA-Z0-9_]+$/
    if (!usernameRegex.test(username)) {
        return {
            status: false,
            message: "Username can only contain alphanumeric characters and underscores"
        }
    }
    if (password.trim() == "") {
        return {
            status: false,
            message: "Password cannot be empty"
        }
    }
    connection = db.getConnection()
    collection = connection.db("ExpenseTracker").collection("users")
    user = await collection.findOne({ username: username })
    if (!user) {
        return {
            status: false,
            message: "Username Not Found"
        }
    }
    passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return {
            status: false,
            message: "Incorrect Password"
        }
    }

    token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: "30d" })

    return {
        status: true,
        message: "Login Successful",
        token: token
    }
}

module.exports = { login }


