const express = require('express')
const router = express.Router()
const iniRouter = require('./ini')
const videoRouter = require('./video')

router.use('/api/ini', iniRouter)
router.use('/api/video', videoRouter)

module.exports = router
