const Joi = require("joi");
const { model, Schema } = require("mongoose");

const oneDollarDonationsSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: String,
    },
    lastName: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    amountDonated: {
        type: Number,
        required: true,
    },
    usernameUsed: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
}, {timestamps: true})

function validateNewOneDollarDonation(details) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        country: Joi.string().required(),
        amountDonated: Joi.number().min(0.001).required(),
        usernameUsed: Joi.string().required(),
        currency: Joi.string().required(),
    })

    return schema.validate(details);
}

const OneDollarDonation = model('one-dollar-donations', oneDollarDonationsSchema);

module.exports = {
    OneDollarDonation,
    validateNewOneDollarDonation,
}
