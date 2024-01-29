const mongoose = require('mongoose');
const Joi = require('joi');

const bibleMissionsUserSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
    },

    city: {
        type: String,
        required: true,
    }, 

    donateLater: {
        type: String,
        default: ''
    },

    timeline: {
        type: String,
    },

    referrer: {
        type: String,
    }

});

function validateMissionsUser (user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        lastName: Joi.string().required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        phone: Joi.string(),
        timeline: Joi.string(),
        donateLater: Joi.string(),
        referrer: Joi.string().min(0),
    });
    return schema.validate(user)
}

const MissionsUser = mongoose.model('MissionsUser', bibleMissionsUserSchema);

module.exports = {
    MissionsUser,
    validateMissionsUser
};