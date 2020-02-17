const Joi = require('@hapi/joi');

const userIdSchema = Joi.string();

const userSchema = Joi.object({
    firstname: Joi
                .string()
                .required()
                .min(3)
                .max(20)
                .description('First name of the User'),
    lastname:  Joi
                .string()
                .required()
                .min(2)
                .max(20)
                .description('Last name of the User'),
    email:     Joi
                .string()
                .required()
                .email()
                .min(7)
                .max(25)
                .description('Email Id of the User'),
    password:  Joi 
                .string()
                .required()
                .min(2)
                .max(20)
                .description('Password of the User')
});

module.exports = {
    userIdSchema,
    userSchema
}