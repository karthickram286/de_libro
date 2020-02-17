'use strict';

const pgp = require('pg-promise')();

const connectionString = "postgresql://user_login:password@localhost:5432/test";
const db = pgp(connectionString);

module.exports = db;