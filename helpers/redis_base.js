const { createClient } = require('redis')
const { redis_endpoint, password } = require('../configs/app_configs')

const redis_base = createClient({
    url: `redis://default:${password}@${redis_endpoint}`
})

redis_base.on('error', (err) => console.log('Redis Error', err))
redis_base.connect()

module.exports = { redis_base }
