'use strict';

var db = require('../service/db');
var promise = require('bluebird');

function getWallet()
{
    return db.getClient().then(function (client)
    {
        var query = 'SELECT * FROM wallet ORDER BY id;';
        return client.query(query, []).then(function (result)
        {
            return result.rows
        }).finally(client.done)
    }).catch(function (err)
    {
        throw err;
    })
}

function startValue(value)
{
    return db.getClient().then(function (client)
    {
        var query = 'UPDATE wallet SET "PLN" = ' + value + ' WHERE id = 1;';
        return client.query(query, []).then(function (result)
        {
            return promise.resolve(result.rows);
        }).finally(client.done);
    }).catch(function (err)
    {
        throw err;
    })
}

function getCurrency(currencyName)
{
    return db.getClient().then(function (client)
    {
        var query = 'SELECT "' + currencyName + '" FROM wallet;';
        return client.query(query, []).then(function (result)
        {
            return promise.resolve(result.rows[0]);
        }).finally(client.done);
    }).catch(function (err)
    {
        throw err;
    })
}

function updateWallet(currencyForeignName, currencyForeignValue, plnValue)
{
    return db.getClient().then(function (client)
    {
        var query = 'UPDATE wallet SET "' + currencyForeignName + '" = ' + currencyForeignValue + ', "PLN" = ' + plnValue + ' WHERE id = 1;';
        return client.query(query, []).then(function (result)
        {
            return result.rows;
        }).finally(client.done);
    }).catch(function (err)
    {
        throw err;
    });
}

function resetWallet()
{
    return db.getClient().then(function (client)
    {
        var query = 'UPDATE wallet SET "USD" = 0, "PLN" = 0, "EUR" = 0, "GBP" = 0, "CHF" = 0 WHERE id = 1;';
        return client.query(query, []).then(function (result)
        {
            return result.rows;
        }).finally(client.done);
    }).catch(function (err)
    {
        throw err;
    });
}

module.exports = {
    getWallet: getWallet, startValue: startValue, updateWallet: updateWallet, resetWallet: resetWallet, getCurrency: getCurrency
};
