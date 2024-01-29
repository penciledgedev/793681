const mongoose = require('mongoose');
const Joi = require('joi');

const bibleMandateUserSchema = new mongoose.Schema(
  {
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
      default: "N/A",
    },

    currency: {
      type: String,
    },

    donateLater: {
      type: String,
      default: "",
    },

    day: {
      type: String,
      default: "",
    },

    month: {
      type: String,
      default: "",
    },

    referrer: {
      type: String,
      default: "",
    },

    timeline: {
      type: String,
    },

    amount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

function validateMandateUser (user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        lastName: Joi.string().required(),
        country: Joi.string().required(),
        bibles: Joi.string(),
        phone: Joi.string(),
        timeline: Joi.string(),
        amount: Joi.string(),
        referrer: Joi.string(),
        day: Joi.string(),
        month: Joi.string(),
        currency:Joi.string(),
        donateLater: Joi.string(),
    });
    return schema.validate(user)
}

const MandateUser = mongoose.model('MandateUser', bibleMandateUserSchema);

module.exports = {
    MandateUser,
    validateMandateUser
};