'use strict';
var walletManager = require('../business/wallet.manager');
var joiSchema = require('../joi.schema.js');

module.exports = function (server)
{
    server.route({
        method: 'GET', path: '/api/wallet', handler: function (request, reply)
        {
            var wallet = walletManager.getWallet();
            reply(wallet)
        }
    });
    server.route({
        method: 'POST', path: '/api/wallet', handler: function (request, reply)
        {
            walletManager.startValue(request.payload.PLN).then(function ()
            {
                reply();
            });
        }
    });

    server.route({
        method: 'PUT', path: '/api/wallet/{type}', config: {validate: {params: joiSchema.schema}}, handler: function (request, reply)
        {
            walletManager.updateWallet(request.params.type, request.payload).then(function ()
            {
                reply();
            });
        }
    });

    server.route({
        method: 'DELETE', path: '/api/wallet', handler: function (request, reply)
        {
            walletManager.resetWallet().then(function ()
            {
                reply(walletManager.getWallet())
            });
        }
    });
};
