const Joi = require('joi');

const MISSING_FIELD = 'Some required fields are missing';

const schemaUser = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': MISSING_FIELD,
        'string.empty': MISSING_FIELD,
    }),
    password: Joi.string().required().messages({
        'any.required': MISSING_FIELD,
        'string.empty': MISSING_FIELD,
    }),
});

const schemaNewUser = Joi.object({
    displayName: Joi.string().required().min(8)
    .messages({
        'any.required': MISSING_FIELD,
        'string.empty': MISSING_FIELD,
        'string.min': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
        'any.required': MISSING_FIELD,
        'string.empty': MISSING_FIELD,
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': MISSING_FIELD,
        'string.empty': MISSING_FIELD,
        'string.min': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
});

const schemaNewCategory = Joi.object({
    name: Joi.string().required()
    .messages({
        'any.required': '"name" is required',
        'string.empty': '"name" is required',
    }),
});

module.exports = { schemaUser, schemaNewUser, schemaNewCategory };