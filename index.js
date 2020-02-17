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


// db.none('insert into table1(id, name, age) values(${user.id}, ${user.name}, ${user.age})', {
//     user: {id: 5, name: 'user1', age: 23}
// });

// postgresDb.any('SELECT name, age FROM table1')
//     .then(rows => {
//         console.log(rows);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// console.log('connection created with postgres...');

