'use strict';

var wallets = [];

module.exports = function (server)
{
    server.route({
        method: 'GET', path: '/api/wallet', handler: function (request, reply)
        {
            reply({
                result: wallets
            });
        }
    });

    server.route({
        method: 'POST', path: '/api/wallet', handler: function (request, reply)
        {
            wallets = request.payload;

            console.log(wallets);
            reply({
                result: wallets
            });
        }
    });
};
