const express = require("express")

const healthRoutes = require("./healthRoute")
const loginRoutes = require("./loginRoutes") 

const router = express.Router()

router.use("/health", healthRoutes)
router.use("/login", loginRoutes)

module.exports = router