'use strict';
var walletManager = require('../business/wallet.manager');

module.exports = function (server)
{
    server.route({
        method: 'GET', path: '/api/wallet', handler: function (request, reply)
        {
            var wallets = walletManager.getWallet();
            reply({
                result: wallets
            });
        }
    });

    server.route({
        method: 'POST', path: '/api/wallet', handler: function (request, reply)
        {

            walletManager.startValue(request.payload.PLN);

            reply({
                result: walletManager.getWallet()
            });
        }
    });

    server.route({
        method: 'PUT', path: '/api/wallet/{type}', handler: function (request, reply)
        {
            walletManager.updateWallet(request.params.type, request.payload);

            reply({
                result: walletManager.getWallet()
            });
        }
    });
    server.route({
        method: 'DELETE', path: '/api/wallet', handler: function (request, reply)
        {

            walletManager.resetWallet();

            reply({
                result: walletManager.getWallet()
            });
        }
    });
};
