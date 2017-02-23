'use strict';

var Hapi = require('hapi');

var config = require('./config');
var routes = require('./REST/routes');


module.exports = function ()
{
    var server = new Hapi.Server();
    server.connection({
        host: 'localhost', port: config.port
    });

    routes(server);

    server.start(function(err)
    {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
});
};
