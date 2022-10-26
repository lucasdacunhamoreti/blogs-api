// const yup = require('yup');
const Joi = require('joi');

// const EMPTY_FIELD = 'Some required fields are missing';

// const schemaUser = yup.object({
//     email: yup.string().email().required(EMPTY_FIELD),
//     password: yup.string().required(EMPTY_FIELD),
// });

const schemaUser = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Some required fields are missing',
        'string.empty': 'Some required fields are missing',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Some required fields are missing',
        'string.empty': 'Some required fields are missing',
    }),
});

const schemaNewUser = Joi.object({
    displayName: Joi.string().required().min(8)
    .messages({
        'any.required': 'Some required fields are missing',
        'string.empty': 'Some required fields are missing',
        'string.min': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Some required fields are missing',
        'string.empty': 'Some required fields are missing',
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Some required fields are missing',
        'string.empty': 'Some required fields are missing',
        'string.min': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
});

module.exports = { schemaUser, schemaNewUser };