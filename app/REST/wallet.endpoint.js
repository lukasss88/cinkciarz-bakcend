'use strict';
var _ = require('lodash');
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
            var wallet = request.payload;
            var obj, currency;

            if (request.params.type === 'buy') {
                // wallets.PLN -= wallet.PLN;
                // obj = _.omit(wallet, 'PLN');
                // currency = _.keys(obj)[0];
                // wallets[currency] += obj[currency];
                walletManager.addValue('buy', request.payload);
            }
            else if(request.params.type === 'sell'){
                walletManager.addValue('sell', request.payload);
            }

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
