const express = require('express')
const router = express.Router()
const iniController = require('../controllers/ini.controller')

router.get('/', iniController.ini)

module.exports = router
