'use strict';

const db = require('../connection/postgres.connection');

/**
 * Returns a User instance for a given UUID
 * @param {uuid} id 
 */
const getUser = async (id) => {

    const user = await db.any('SELECT * FROM users where id=${user.id}', {
        user: {id}
    });
    return user;
}

/**
 * Adds a new User instance to the DB
 * 
 * @param {uuid} id 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} password 
 */
const addUser = async (id, firstName, lastName, email, password) => {
    
    // Checks whether the user already exists
    const user = await db.any('SELECT * FROM users where email=${email}', {
        email
    });
    if (user[0] != undefined && user[0].email === email) {
        throw new Error('User already exists');
    }
    await db.none('insert into users(id, firstname, lastname, email, password) values(${user.id}, ${user.firstName}, ${user.lastName}, ${user.email}, ${user.password})', {
        user: {id, firstName, lastName, email, password}
    });
}

module.exports = {
    getUser,
    addUser
}