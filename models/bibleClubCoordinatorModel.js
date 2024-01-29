const mongoose = require('mongoose');
const Joi = require('joi');

const coordinatorSchema =  new mongoose.Schema({
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

    city: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
    }

});

function validateUser (user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        lastName: Joi.string().required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        phone: Joi.string(),
        
    });
    return schema.validate(user)
}

const Coordinator = mongoose.model('Coordinator', coordinatorSchema);

module.exports ={ 
    Coordinator,
    validateUser
};