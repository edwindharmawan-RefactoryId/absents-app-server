const cors = require('cors')
const express = require('express')

const app = express()

const { authenticate, authorized } = require('./middlewares/auth')

const user = require('./routers/user.router')
const absent = require('./routers/absent.router')
const authorizedRoute = require('./routers/authorized.router.js')
const changePassword = require('./routers/changePassword.router')

require('dotenv').config();

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
	res.send('hello')
})

app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(cors())

app.use(user)
app.use(authenticate)
app.use(absent)
app.use(changePassword)
app.use(authorized)
app.use(authorizedRoute)

app.listen(port, () => {
	console.log(`connected on http://localhost:${port}`);
})
