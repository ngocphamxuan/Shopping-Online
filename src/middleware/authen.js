require('dotenv').config()
const jwt = require('jsonwebtoken')
const Authen = {
    verifyToken: async (req, res, next) => {
        const bearerToken = req.headers['authorization']
        const token = bearerToken && bearerToken.split[' ']
        if(!token) res.status(401)
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if(err) res.status(401)
                req.userId = decoded.id
                next()
            })

        } catch (error) {
            res.status(401)
        }
    },
    verifyRefreshToken: async (req, res, next) => {
        const bearerToken = req.headers['authorization']
        const refreshToken = bearerToken && bearerToken.split[' ']
        if(!refreshToken) res.status(401)
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if(err) res.status(401)
                req.userId = decoded.id
                next()
            })

        } catch (error) {
            res.status(401)
        }
    },
}