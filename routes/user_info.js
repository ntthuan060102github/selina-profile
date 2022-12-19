const router = require('express').Router()
const { 
    get_user_info_by_id, 
    get_user_info_by_email,
    get_list_user_info_by_id
} = require('../controllers/user_info')

router.post("/get-user-info-by-id", get_user_info_by_id)
router.post("/get-user-info-by-email", get_user_info_by_email)
router.post("/get-list-user-info-by-id", get_list_user_info_by_id)

module.exports = router