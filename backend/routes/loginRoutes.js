const express = require("express")
const router = express.Router()
const loginService = require("../services/loginService")

router.post("/", (req, res)=>{
    loginService.login(req.body, res)
})

router.post("/token", (req, res)=>{
    loginService.loginToken(req.body, res)
})
module.exports = router