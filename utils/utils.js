const jwt = require('jsonwebtoken');


exports.generateTokenForOneDollarUser = async (data) => {
    const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    })

    return token
}