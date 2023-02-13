const bcrypt = require('bcrypt')

function hashPassword (userPassword) {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(userPassword, salt);
	return hash
}

function comparePassword (userInput, userDB) {
	return bcrypt.compareSync(userInput, userDB);
}

module.exports = { hashPassword, comparePassword }