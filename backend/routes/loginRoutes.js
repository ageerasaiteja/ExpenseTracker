const express = require("express")
const router = express.Router()
const loginService = require("../services/loginService")

router.post("/", async (req, res)=>{
    res.json(await loginService.login(req.body))
})

module.exports = router