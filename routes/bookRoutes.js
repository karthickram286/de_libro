'use strict';

const uuid = require('uuid');

const bookSchema = require('../schema/book');
const bookAPI = require('../book/bookAPI');

const bookRoutes = (server) => [{

    /**
     * @route   POST     /api/book/add
     * @desc    Adds a new book to the store
     * @access  Public
     */
    method: 'POST',
    path: '/api/book/add',
    handler: async (request, h) => {
        const { name, price, quantity, authorname, added_by } = request.payload;
        const book_id = uuid();

        try {
            // Book schema validation
            await bookSchema.validateAsync({ name, price, quantity, authorname, added_by });

            await bookAPI.addBook(book_id, name, price, quantity, authorname, added_by);
            return 'Book added successfully';
        } catch (err) {
            console.log(err);
            return err.message;
        }

    }
}, {
    
    /**
     * @route   GET     /api/book/get/{id}
     * @desc    Returns a Book instance from DB for a given book id
     * @access  Public
     */
    method: 'GET',
    path: '/api/book/get/{book_id}',
    handler: async (request, h) => {
        const book_id = request.params.book_id;

        try {
            const book = await bookAPI.getBook(book_id);
            return book;
        } catch (err) {
            console.log(err);
            return err.message;
        }
    }
}];


module.exports = bookRoutes;