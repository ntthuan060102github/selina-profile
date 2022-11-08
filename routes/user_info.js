const router = require('express').Router()
const { 
    get_user_info_by_id, 
    get_user_info_by_email
} = require('../controllers/user_info')

router.post("/get-user-info-by-id", get_user_info_by_id)
router.post("/get-user-info-by-email", get_user_info_by_email)

module.exports = router