const express = require('express')
const router = express.Router()
const videoController = require('../controllers/video.controller')

router.get('/', videoController.get)
router.get('/ocr', videoController.ocr)
router.get('/transcript', videoController.transcript)
router.post('/', videoController.post)

module.exports = router
