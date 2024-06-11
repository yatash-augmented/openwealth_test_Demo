const cors = require('cors')

const corsMiddleware = cors({
 origin: 'http://127.0.0.1:3000', // or specify allowed origins
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
 allowedHeaders: ['Content-Type', 'Authorization'],
 credentials: true
})

module.exports = (req, res, next) => {
 corsMiddleware(req, res, next)
}
