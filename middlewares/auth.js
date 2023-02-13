const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')


async function authenticate (req, res, next) {
	try {
		const decode = verifyToken(req.headers.access_token)
		const data = await User.findOne({
			where: { id: decode.id }
		})
		if (!data) {
			res.status(400).json({
				message: 'Please login'
			})
		} else { 
			req.user = data
			next()
		}
	} catch (err) {
		res.status(500).json(err)
	}
}

async function authorized (req, res, next) {
	try {
		let role = req.user.role
		if (role !== 'ADMIN') {
			res.status(401).json({
				message: 'Your account not allowed to access'
			})
		} else {
			next()
		}
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}

module.exports = { authenticate, authorized }