'use strict';

const hapiServer = require('./server/hapiServer');
const bookConsumer = require('./book/bookConsumer');

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

/**
 * Starting the book consumer
 */
bookConsumer();
