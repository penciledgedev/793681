const mongoose = require("mongoose");
const Joi = require("joi");

const donatenowUserSchema = new mongoose.Schema(
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
      required: true,
    },

    currency: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

function validateDonatenowUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    lastName: Joi.string().min(5).max(20).required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
    amount: Joi.string().required(),
    currency: Joi.string().required(),
  });
  return schema.validate(user);
}

const DonatenowUser = mongoose.model("donatenow-user", donatenowUserSchema);

module.exports = {
  DonatenowUser,
  validateDonatenowUser,
};
