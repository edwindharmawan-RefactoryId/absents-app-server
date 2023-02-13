const authorized = require('express').Router()
const userController = require('../controllers/user.controller')
const absentController = require('../controllers/absent.controller')

authorized.post('/register', userController.register)
authorized.get('/absents', absentController.absentList)

module.exports = authorized