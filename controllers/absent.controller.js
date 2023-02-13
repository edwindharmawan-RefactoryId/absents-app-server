const uuid = require('uuid-v4')
const { Storage } = require("@google-cloud/storage")

const { Absent } = require('../models')
const serviceAccount = require('../config/firebase/sa')

async function absentList (req, res) {
	const { limit, offset } = req.query
	try {
		if (req.user.role !== 'ADMIN') {
			return res.status(403).json({
				messages: ['Access forbidden.'],
			})
		}

		const absents = await Absent.findAll({
			limit: +limit || 5,
			offset: +offset || 0
		})

		return res.status(200).json({
			data: {
				limit: +limit || 5,
				offset: +offset || 0,
				absents,
			},
		})
	} catch (error) {
		return res.status(500).json({
			messages: ['Error in internal server']
		})
	}
}

async function absentDetail (req, res) {
	const { id } = req.params
	const errors = []

	if (!!!id) {
		errors.push('Absent ID is required.')
	}
	if (isNaN(id)) {
		errors.push('ID should be a number.')
	}

	if (errors.length) {
		return res.status(400).json({
			messages: errors
		})
	}

	try {
		const absent = await Absent.findOne({
			where: { id }
		})

		if (!absent) {
			return res.status(404).json({
				messages: ['Absent not found.']
			})
		}
		return res.status(200).json({
			data: absent
		})
	} catch (error) {
		return res.status(500).json({
			messages: ['Error in internal server']
		})
	}
}

async function createAbsent(req, res) {
	try {
		if (req.file.mimetype.split('/')[0] !== 'image') {
			return res.status(400).json({
				messages: ['Please upload an image.'],
			})
		}

		const storage = new Storage({
			projectId: serviceAccount.project_id,
			credentials: {
				private_key: serviceAccount.private_key,
				client_email: serviceAccount.client_email
			}
		})

		const fileNameOrgin = req.file.originalname.split('.')
		const fileName = 'storage-' + uuid() + '.' + fileNameOrgin[fileNameOrgin.length - 1]

		const bucket = storage.bucket(process.env.BUCKET_ID)
		const file = bucket.file(fileName)

		await file.save(req.file.buffer)
		const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/' + process.env.BUCKET_ID + '/o/' + fileName + '?alt=media'
		await Absent.create({
			userId: req.user.id,
			imageUrl,
			userEmail: req.user.email
		})

		return res.status(200).json({
			data: {
				imageUrl,
			}
		})
	} catch (error) {
		return res.status(500).json({
			messages: ['Error in internal server', error]
		})
	}
}

module.exports = { absentList, absentDetail, createAbsent }