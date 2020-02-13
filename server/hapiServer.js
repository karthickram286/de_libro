'use strict';

const Hapi = require('@hapi/hapi');
const serverOptions = require('./serverOptions');

const startHapiServer = async () => {
    const server = Hapi.server(serverOptions);
    await server.start();
    console.log(`De Libro server started on port ${server.info.port}`);
}

module.exports = startHapiServer;