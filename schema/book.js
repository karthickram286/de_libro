const Joi = require('joi');

const bookSchema = Joi.object({
    name: Joi
            .string()
            .required()
            .min(5)
            .max(100)
            .description('Name of the Book'),
    price: Joi
            .number()
            .required()
            .min(50)
            .max(10000)
            .description('Price of the Book'),
    quantity: Joi
            .number()
            .default(1)
            .min(0)
            .max(1000)
            .description('Quantity of the Book'),
    authorname: Joi
            .string()
            .required()
            .min(3)
            .max(100)
            .description('Author name of the Book'),
    added_by: Joi
            .string()
            .required()
            .min(10)
            .description('User Id of the user who added the book')
});

module.exports = bookSchema;