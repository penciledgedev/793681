const jwt = require('jsonwebtoken');
const { Referrer } = require('../models/referrerModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // const decoded = jwt.verify(token,"okayhereitis")
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.user = await Referrer.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, No token')
    }
})

module.exports = protect