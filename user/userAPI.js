'use strict';

const db = require('../connection/postgres.connection');

/**
 * Adds a new User instance to the DB
 * 
 * @param {*} id 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} email 
 * @param {*} password 
 */
const addUser = async (id, firstName, lastName, email, password) => {
    
    try {
        await db.none('insert into users(id, firstname, lastname, email, password) values(${user.id}, ${user.firstName}, ${user.lastName}, ${user.email}, ${user.password})', {
            user: {id, firstName, lastName, email, password}
        });
    } catch (err) {
        return err;
    }
}

const getUser = async (id) => {

    try {
        const user = await db.any('SELECT * FROM users where id=${user.id}', {
            user: {id}
        });
        return user;
    } catch (err) {
        return err;
    }
}

module.exports = {
    addUser,
    getUser
}