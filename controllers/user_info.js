const cryptoJS = require('crypto-js')
const { validationResult } = require('express-validator');
const UserInformation = require('../models/UserInformation')
const { password_encode_key, SECRET_KEY } = require('../configs/app_configs')
const response_data = require('../helpers/response')
const { send_mail } =require("../helpers/send_email")
const get_session_data = require("../helpers/get_session_data")
const upload_image = require("../helpers/upload_image_to_storage")

const get_user_info_by_id = async (req, res, next) => {
    try {
        data = req.body
        user_id = data.user_id
        secret_key = data?.secret_key

        if (!Number.isInteger(user_id)) {
            return res.json(response_data(data="data_invalid", status_code=4))
        }

        user_id= Number.parseInt(user_id)
        user_info = await UserInformation.findOne({ user_id: user_id })
        if (Boolean(user_info)) {
            user_data = user_info?._doc
            password = user_data.password
            user_data = {
                "user_id": user_data.user_id,
                "full_name": user_data.full_name,
                "phone_num": user_data.phone_num,
                "email": user_data.email,
                "device_token": user_data.device_token,
                "avatar_url": user_data.avatar_url,
                "user_type": user_data.user_type,
                "account_status": user_data.account_status,
                "gender": user_data.gender
            }

            if (secret_key === SECRET_KEY) {
                user_data['password'] = password
            }
        }
        else {
            user_data = "no_data"
        }
        return res.json(response_data(user_data))
    }
    catch (err) {
        return res.json(response_data(data={}, status_code=4, message=err.message))
    }
}

const get_list_user_info_by_id = async (req, res, next) => {
    try {
        const data = req.body
        const list_user_id = data.list_user_id

        const list_user_info = await UserInformation.find({
            user_id: {
                $in: list_user_id
            }
        })
        
        return res.json(response_data(list_user_info))
    }
    catch (err) {
        return res.json(response_data(data={}, status_code=4, message=err.message))
    }
}

const get_user_info_by_email = async (req, res, next) => {
    try {
        data = req.body
        email = data.email
        secret_key = data?.secret_key

        user_info = await UserInformation.findOne({ email: email })

        if (Boolean(user_info)) {
            user_data = user_info?._doc
            password = user_data.password
            user_data = {
                "user_id": user_data.user_id,
                "full_name": user_data.full_name,
                "phone_num": user_data.phone_num,
                "email": user_data.email,
                "device_token": user_data.device_token,
                "avatar_url": user_data.avatar_url,
                "user_type": user_data.user_type,
                "account_status": user_data.account_status,
                "gender": user_data.gender
            }

            if (secret_key === SECRET_KEY) {
                user_data['password'] = password
            }
        }
        else {
            user_data = "no_data"
        }
        return res.json(response_data(user_data))
    }
    catch (err) {
        return res.json(response_data(data={}, status_code=4, message=err.message))
    }
}

const modify_personal_info = async (req, res, next) => {
    try {
        const input_validate = validationResult(req)
        if (!input_validate.isEmpty()) {
            return res.json(response_data(
                data=input_validate.array(),
                status_code=4,
                message=''
            ))
        }

        const session_data = JSON.parse(await get_session_data(req))
        const user_id = session_data?.user_id
        const original_record = await UserInformation.findOne({ user_id: user_id })
        if (!Boolean(original_record)) {
            return res.json(response_data(
                data='user_not_found',
                status_code=4,
                message='Tài khoản không tồn tại!'
            ))
        }

        let user_image = req.file
        if (user_image && !user_image.mimetype.includes("image")) {
            return res.json(response_data(
                data='image_invalid',
                status_code=4,
                message='Hình ảnh không hợp lệ!'
            ))
        }

        let query = {}
        if (Boolean(user_image)) {
            const upload_image_res = await upload_image(user_image)
            query['avatar_url'] = upload_image_res?.data?.url
        }
        let data = req?.body
        for (const key of ['full_name', 'phone_num', 'address', 'gender']) {
            if (data[key] && data[key] !== original_record[key]) {
                query[key] = data[key]
            }
        }

        const update_result = await UserInformation.updateOne(
            { user_id: user_id },
            query,
            { runValidators: true, context: 'query' }
        )
        if (!update_result?.acknowledged) {
            return res.json(response_data(
                data='no_change',
                status_code=1,
                message='Không có thay đổi'
            ))
        }
        return res.json(response_data(data='success', status=1, message='Thành công'))
    }
    catch (err) {
        return res.json(response_data(data={}, status_code=4, message=err.message))
    }
}

const get_personal_info = async (req, res) => {
    try {
        const session = JSON.parse(await get_session_data(req))
        const user_id = session?.user_id
        const info = await UserInformation.findOne(
            { user_id: user_id },
            'user_id full_name phone_num email device_token avatar_url user_type account_status gender -_id'
        )
        if (!info) {
            return res.json(response_data(data='', status_code=1, message='Tài khoản không tồn tại'))
        }
        return res.json(response_data(data=info, status_code=1, message=""))
    }
    catch (err) {
        return res.json(response_data(data={}, status_code=4, message=err.message))
    }
}

module.exports = { 
    get_user_info_by_id, 
    get_list_user_info_by_id,
    get_user_info_by_email,
    get_personal_info,
    modify_personal_info,
}