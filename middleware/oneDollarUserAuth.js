const jwt = require("jsonwebtoken");
const { OneDollarCampaign } = require("../models/oneDollarCampaignModel");

exports.oneDollarUserAuth = async (req, res, next) => {
    const authToken = req.headers['auth-token'];
    // console.log(authToken);
    if (!authToken) return res.status(401).send('Access denied, token invalid or missing.');

    try {
        const decodedUser = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

        // checking if the decoded user exists
        const existingUser = await OneDollarCampaign.findById(decodedUser._id).select('-password');
        if (!existingUser) return res.status(401).send('Access denied, token invalid or missing.');

        req.user = existingUser;
        // console.log(decodedUser);
        next();

    } catch (error) {
        res.clearCookie('accessToken');
        
        return res.status(401).send('Access denied, token invalid or missing.');
    }
}