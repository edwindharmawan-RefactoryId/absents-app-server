require('dotenv').config()

const {
    AUTH_URI,
    TOKEN_URI,
    CLIENT_ID,
    PROJECT_ID,
    PRIVATE_KEY,
    CLIENT_EMAIL,
    AUTH_PROVIDER,
    PRIVATE_KEY_ID,
    SERVICE_ACCOUNT,
    CLIENT_CERT_URL,
} = process.env

const credentials = {
    "type": SERVICE_ACCOUNT,
    "project_id": PROJECT_ID,
    "private_key_id": PRIVATE_KEY_ID,
    "private_key": PRIVATE_KEY,
    "client_email": CLIENT_EMAIL,
    "client_id": CLIENT_ID,
    "auth_uri": AUTH_URI,
    "token_uri": TOKEN_URI,
    "auth_provider_x509_cert_url": AUTH_PROVIDER,
    "client_x509_cert_url": CLIENT_CERT_URL
}

module.exports = credentials