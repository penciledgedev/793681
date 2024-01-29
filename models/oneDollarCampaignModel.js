const Joi = require("joi");
const { model, Schema } = require("mongoose");

const oneDollarCampaignSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdminUser: {
        type: Boolean,
        default: false,
    },
    zone: {
        type: String,
    },
    church: {
        type: String,
    },
})

function validateNewOneDollarCampaign(details) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        zone: Joi.string(),
        church: Joi.string(),
    })

    return schema.validate(details);
}

const OneDollarCampaign = model('one-dollar-campaign', oneDollarCampaignSchema);

module.exports = {
    OneDollarCampaign,
    validateNewOneDollarCampaign,
}
