const password_encode_key = "selina_8d58f12a545sd10cy39w4psu4cnk"
const ROUTES_PREFIX = `/selina-profile-api`

const otp_length = 8

const SECRET_KEY = process.env.SECRET_KEY
const REDIS_ENDPOINT_URI = process.env.REDIS_ENDPOINT_URI
const REDIS_PASSWORD = process.env.REDIS_PASSWORD
const redis_endpoint =  REDIS_ENDPOINT_URI
const redis_password = REDIS_PASSWORD || undefined

module.exports = { 
    password_encode_key, 
    ROUTES_PREFIX,
    otp_length,
    redis_endpoint,
    redis_password,
    SECRET_KEY
}