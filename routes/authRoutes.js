'use strict';

const uuid = require('uuid/v1');

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

        // User Id validation
        try {
            await userIdSchema.validateAsync(userId);
        } catch (err) {
            return err.message;
        }
        const user = userAPI.getUser(userId);
        return user;
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

        // UserSchema validation
        try {
            await userSchema.validateAsync({ firstname, lastname, email, password });
        } catch (err) {
            return err.message;
        }

        userAPI.addUser(userId, firstname, lastname, email, password);
        return "User added successfully";
    }
}];

module.exports = authRoutes;