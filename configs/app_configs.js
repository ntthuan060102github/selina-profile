const password_encode_key = "selina_8d58f12a545sd10cy39w4psu4cnk"
const ROUTES_PREFIX = `/selina-profile-api`

const otp_length = 8

const SECRET_KEY = process.env.SECRET_KEY || "selina_2a9wf5498fhm48yio64ty1j68fgn48ae48r4h"
const APP_ENV = process.env.app_env || "local"
const REDIS_ENDPOINT_URI = process.env.REDIS_ENDPOINT_URI || "redis-18667.c8.us-east-1-2.ec2.cloud.redislabs.com:18667"
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "dVZCrABvG85l0L9JQI9izqn2SDvvTx82"

module.exports = { 
    password_encode_key, 
    ROUTES_PREFIX,
    otp_length,
    REDIS_ENDPOINT_URI,
    REDIS_PASSWORD,
    SECRET_KEY,
    APP_ENV
}