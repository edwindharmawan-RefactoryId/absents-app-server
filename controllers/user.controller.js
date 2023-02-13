const { User } = require('../models')
const { validateEmail } = require('../helpers/email')
const { generateToken } = require('../helpers/jwt')
const { comparePassword, hashPassword } = require('../helpers/bcrypt')

async function login (req, res) {
	const { email, password } = req.body
	try {
		const isFind = await User.findOne({
			where: { email }
		})
		if (!isFind) {
			return res.status(401).json({
				messages: ['Email or password not found']
			})
		}

		const isCorrect = comparePassword(password, isFind.password)
		if (!isCorrect) {
			return res.status(401).json({
				messages: ['Email or password not found']
			})
		}

		const data = {
			id: isFind.id,
			email: isFind.email,
		}
		const access_token = generateToken(data)
		return res.status(200).json({
			data: {
				...data,
				access_token
			}
		})
	} catch (error) {
		const messages = error.errors.map((a) => a.message)
		return res.status(500).json({
			messages
		})
	}
}

async function register (req, res) {
	const { email, password, role } = req.body
	const errors = []

	if (!validateEmail(email)) {
		errors.push('Input email correctly.')
	}
	if (!email || !password) {
		errors.push('Email or password is required.')
	}
	if (!role) {
		errors.push('Role is required.')
	}
	if (password.length <= 8) {
		errors.push('Minimum password is 8 characters.')
	}

	if (errors.length) {
		return res.status(400).json({
			messages: errors,
		})
	}

	try {
		const find = await User.findOne({
			where: { email }
		})
		if (find) {
			return res.status(400).json({
				messages: ['This email is registered'],
			})
		}

		const create = await User.create({
			email, password, role
		})

		return res.status(201).json({
			data: {
				id: create.id,
				email: create.email,
				role: create.role
			}
		})
	} catch (error) {
		const messages = error.errors.map((a) => a.message)
		return res.status(500).json({
			messages
		})
	}
}

async function changePassword (req, res) {
	const { oldPassword, newPassword } = req.body
	const errors = []
	
	try {
		const isSame = comparePassword(oldPassword, req.user.password)

		if (!oldPassword || !newPassword) {
			errors.push('Old Password or New Password correctly.')
		}
		if (newPassword <= 8) {
			errors.push('Minimum password is 8 characters.')
		}
		if (oldPassword == newPassword || !isSame) {
			errors.push('Old Password or New Password can not have same value.')
		}

		if (errors.length) {
			return res.status(400).json({
				messages: errors,
			})
		}

		await User.update(
			{
				password: hashPassword(newPassword)
			},
			{
				where: {
					id: req.user.id,
					email: req.user.email
				}
			}
		)

		return res.status(200).json({
			data: "Change password is success."
		})
	} catch (error) {
		return res.status(500).json({
			messages: error
		})
	}
}

module.exports = { login, register, changePassword }