'use strict';

const bookRoutes = (server) => [{
    method: 'GET',
    path: '/api/user/you',
    handler: (request, h) => {
        return 'Hello you';
    }
}];

module.exports = bookRoutes;