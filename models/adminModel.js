const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default:true
  }
});

function validateAdmin(user) {
  const schema = Joi.object({
    name: Joi.string(),
    password: Joi.string().required(),
    isAdmin:Joi.boolean()
  });
  return schema.validate(user);
}

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    process.env.JWT_ADMIN
  );
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = {
   Admin,
  validateAdmin,
};
