'use strict';

var walletEndpoint = require('./wallet.endpoint');

module.exports = function (server)
{
    walletEndpoint(server);
};
