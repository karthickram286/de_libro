'use strict';

const Hapi = require('@hapi/hapi');
const serverOptions = require('./serverOptions');
const authRoutes = require('../routes/authRoutes');
const bookRoutes = require('../routes/bookRoutes');

const startHapiServer = async () => {
    const server = Hapi.server(serverOptions);

    // Registering authentication routes
    server.route([
        ...authRoutes(server), 
        ...bookRoutes(server)]
    );

    await server.start();
    console.log(`De Libro server started on port ${server.info.port}`);
}

module.exports = startHapiServer;