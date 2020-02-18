'use strict';

const redis = require('redis');
const util = require('util');

const redisClient = redis.createClient(6379);
const getAsync = util.promisify(redisClient.get).bind(redisClient);

const db = require('../connection/postgres.connection');
const bookProducer = require('../book/bookProducer');

/**
 * Adds a book to the DB
 * 
 * @param {uuid} id 
 * @param {string} name 
 * @param {number} price 
 * @param {number} quantity 
 * @param {string} author 
 * @param {uuid} added_by 
 */
const addBook = async (id, name, price, quantity, author, added_by) => {

    // Checks whether book already exists
    const book = await db.any('SELECT * FROM books where name=${name}', {
        name
    });

    if (book[0] != undefined && book[0].name === name) {
        throw new Error('Book already exists');
    }

    await db.none('insert into books(book_id, name, price, quantity, authorname, added_by) values(${book.id}, ${book.name}, ${book.price}, ${book.quantity}, ${book.author}, ${book.added_by})', {
        book: { id, name, price, quantity, author, added_by }
    });

    // Notifying using Book producer
    bookProducer(name, price, quantity);
}

/**
 * 
 * @param {uuid} id 
 */
const getBook = async (id) => {

    // Checking the value in redis cache
    const cachedBook = await getAsync(id + "");
    if (cachedBook) {
        return JSON.parse(cachedBook);
    }
    
    const book = await db.any('SELECT * FROM books where book_id=${id}', {
        id
    });

    // If the value is returned from DB, adding this to cache
    redisClient.setex(id + "", 15, JSON.stringify(book));
    return book;
}

module.exports = {
    addBook,
    getBook
}