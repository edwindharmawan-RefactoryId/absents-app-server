const multer = require('multer');
const absent = require('express').Router()

const controller = require('../controllers/absent.controller')

const upload = multer();

absent.get('/absent/:id', controller.absentDetail)
absent.post('/absent', upload.single('file'), controller.createAbsent)

module.exports = absent