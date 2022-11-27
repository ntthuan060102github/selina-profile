const password_encode_key = "selina_8d58f12a545sd10cy39w4psu4cnk"
const ROUTES_PREFIX = `/selina-profile-api`

const otp_length = 8

const SECRET_KEY = process.env.SECRET_KEY
const APP_ENV = process.env.app_env || "staging"
const REDIS_ENDPOINT_URI = process.env.REDIS_ENDPOINT_URI || "redis-16376.c52.us-east-1-4.ec2.cloud.redislabs.com:16376"
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "eHiU1tMrweOCs6qjEzhoDN4FYa0wvqwD"

module.exports = { 
    password_encode_key, 
    ROUTES_PREFIX,
    otp_length,
    REDIS_ENDPOINT_URI,
    REDIS_PASSWORD,
    SECRET_KEY,
    APP_ENV
}