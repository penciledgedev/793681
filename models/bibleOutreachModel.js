const mongoose = require('mongoose');
const Joi = require('joi');

const bibleOutreachUserSchema =  new mongoose.Schema({
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

    bibles: {
        type: String,
        required: true,
    },

    outreachType: {
        type: String,
        required: true,
    },

    donateLater: {
        type: String,
        default: ''
    },

    timeline: {
        type: String,
    }

});

function validateOutreachUser (user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        lastName: Joi.string().required(),
        country: Joi.string().required(),
        bibles: Joi.string().required(),
        outreachType: Joi.string().required(),
        phone: Joi.string(),
        timeline: Joi.string(),
        donateLater: Joi.string(),
    });
    return schema.validate(user)
}

const OutreachUser = mongoose.model('OutreachUser', bibleOutreachUserSchema);

module.exports = {
    OutreachUser,
    validateOutreachUser
};