const changePassword = require('express').Router()

const controller = require('../controllers/user.controller')

changePassword.patch('/changePassword', controller.changePassword)

module.exports = changePassword