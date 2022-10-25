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

module.exports = { schemaUser };