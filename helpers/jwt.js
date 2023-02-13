const jwt = require('jsonwebtoken')

function generateToken (dataUser) {
	return jwt.sign(dataUser, process.env.JWT_KEY)
}
function verifyToken (dataUser) {
	return jwt.verify(dataUser, process.env.JWT_KEY)
}

module.exports = { generateToken, verifyToken }