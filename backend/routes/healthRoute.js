const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.json({ status: true, error: false, code: 200, message: "Server Up and Running" })
})  

module.exports = router