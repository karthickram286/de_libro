'use strict';

const hapiServer = require('./server/hapiServer');

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



