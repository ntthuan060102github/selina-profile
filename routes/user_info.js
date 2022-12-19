const router = require('express').Router()
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage()
})

const { 
    get_user_info_by_id, 
    get_user_info_by_email,
    get_list_user_info_by_id,
    modify_personal_info
} = require('../controllers/user_info')

const {
    personal_info_modification_form_validator
} = require('../validation/user_info')

const {
    auth_user_middleware
} = require('../middlewares/auth_user')

router.post("/get-user-info-by-id", get_user_info_by_id)
router.post("/get-user-info-by-email", get_user_info_by_email)
router.post("/get-list-user-info-by-id", get_list_user_info_by_id)

router.patch(
    "/modify-personal-info",
    auth_user_middleware,
    personal_info_modification_form_validator(),
    upload.single('image'),
    modify_personal_info
)

module.exports = router