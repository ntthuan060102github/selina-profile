const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')
const cors = require('cors');

const app = express()

const { ROUTES_PREFIX } = require('./configs/app_configs')

const account_router = require('./routes/account')
const user_info_router = require('./routes/user_info')
const upload_router = require('./routes/upload_file_to_fb')

dotenv.config()

mongoose.connect(
    process.env.MONGO_DB_URL || "mongodb+srv://Zeta:thuan2002@cluster0.pmjo1.mongodb.net/Selina?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    () => {
        console.log('Connected to MongoDB...')
    }
)

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors({ origin: true }));

// const upload = multer({
//     storage: multer.memoryStorage()
// })
// app.use(upload.single())


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    console.log(req.headers)
    next()
})

app.get("/", (req, res) => {
    res.send(`Selina - Profile Service (${process.env.app_env})`)
})
app.use(ROUTES_PREFIX + "", account_router)
app.use(ROUTES_PREFIX + "", user_info_router)
app.use(ROUTES_PREFIX + "", upload_router)

app.listen(process.env.PORT || 8800 , () => {
    console.log("Profile service is running...")
})

