const router = require('express').Router()
const { body } = require('express-validator')
const { 
    create_new_account,
    approve_account,
    re_send_otp } = require('../controllers/account')
const { 
    create_account_validator, 
    approve_account_validator } = require('../validation/account_validate')

router.post("/create-new-account", create_account_validator(), create_new_account)
router.post("/approve-account", approve_account_validator(), approve_account)
router.post("/re-send-otp", body('email').isEmail(), re_send_otp)

module.exports = router