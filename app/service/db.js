'use strict';

var Promise = require('bluebird');
var pg = require('pg').native;

var config = require('../config.js');

function getClient()
{
    var pgConnect = Promise.promisify(pg.connect, pg);
    return pgConnect(config.db.connectionUrl).then(function (db)
    {
        var client = db[0];
        return {query: Promise.promisify(client.query, client), done: db[1]};
    });
}

module.exports = {
    getClient: getClient
};
