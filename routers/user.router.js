const user = require('express').Router()
const controller = require('../controllers/user.controller')

user.post('/login', controller.login)

module.exports = user