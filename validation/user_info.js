const { check } = require('express-validator');

const personal_info_modification_form_validator = () => {
	return [
		check("full_name").optional().isString().trim().escape().isLength({ max: 50, min: 1 }),
        check("phone_num").optional().isMobilePhone().trim().escape().isLength({ max: 10, min: 1 }),
        check("address").optional().isString().trim().escape(),
        check("gender").optional().isBoolean()
	]
}

module.exports = {
	personal_info_modification_form_validator
}