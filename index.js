'use strict';

const hapiServer = require('./server/hapiServer');

const postgresDb = require('./connection/postgres.connection');

/**
 * Rejection handler
 */
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

/**
 * Starting the Hapi Server
 */
hapiServer();

