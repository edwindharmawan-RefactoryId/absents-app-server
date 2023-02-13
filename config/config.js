require('dotenv').config()

const {
  USERNAME,
  PASSWORD,
  DB_PRODUCTION,
  DB_DEVELOPMENT,
} = process.env

const config = {
  "development": {
    "username": USERNAME,
    "password": PASSWORD,
    "database": DB_DEVELOPMENT,
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": USERNAME,
    "password": PASSWORD,
    "database": DB_PRODUCTION,
    "host": "localhost",
    "dialect": "postgres"
  }
}

module.exports = config