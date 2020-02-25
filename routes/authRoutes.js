'use strict';

const uuid = require('uuid/v1');
// const bcrypt = require('bcrypt');

const userAPI = require('../user/userAPI');
const userSchema = require('../schema/user').userSchema;
const userIdSchema = require('../schema/user').userIdSchema;

const authRoutes = (server) => [{

    /**
     * @route   GET     /api/user/{id}
     * @desc    Returns a user for a given Id
     * @access  Public
     */
    method: 'GET',
    path: '/api/user/{id}',
    handler: async (request, h) => {
        let userId = request.params.id;

        try {
            // User Id validation
            await userIdSchema.validateAsync(userId);

            const user = userAPI.getUser(userId);
            return user;
        } catch (err) {
            console.log(err);
            return err.message;
        }
    }

}, {

    /**
     * @route   POST     /api/user/add
     * @desc    Adds a new User to the DB
     * @access  Public
     */
    method: 'POST',
    path: '/api/user/add',
    handler: async (request, h) => {
        const { firstname, lastname, email, password } = request.payload;
        const userId = uuid();

        try {
            // UserSchema validation
            await userSchema.validateAsync({ firstname, lastname, email, password });

            await userAPI.addUser(userId, firstname, lastname, email, password);
        } catch (err) {
            console.log(err);
            return err.message;
        }
    
        return "User added successfully";
    }
}];

module.exports = authRoutes;