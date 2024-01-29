const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const referrerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    bankDetails: {
        bankName: {
            type: String,
            default: "Sterling Bank"
        },
        accountName: {
            type: String,
            default: "LOVEWORLD PUBLISHING LTD - BIBLES"
        },
        accountNum: {
            type: Number,
            default: 0067734527
        },
    }

})

function validateReferrer (user) {
    const schema = Joi.object({
        username: Joi.string(),
        password: Joi.string().required()
    });
    return schema.validate(user)
}

referrerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const Referrer = mongoose.model('Referrer', referrerSchema);

module.exports = {
    Referrer,
    validateReferrer
};