'use strict';

var db = require('../service/db');
var promise = require('bluebird');

// var wallet = {PLN: 0, EUR: 0, USD: 0, GBP: 0, CHF: 0};

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
        var query = 'UPDATE wallet SET PLN = ' + value +' WHERE id = 1;';
        return client.query(query, []).then(function (result)
        {

            return promise.resolve(result.rows);
        }).finally(client.done);
    }).catch(function (err)
    {
        throw err;
    })
}

function getCurrency(currencyName) {
    return db.getClient().then(function (client)
    {
        console.log(currencyName);
        var query = 'SELECT '+ currencyName+' FROM wallet;';
        return client.query(query, []).then(function (result)
        {

            return promise.resolve(result.rows[0]);
        }).finally(client.done);
    }).catch(function (err)
    {
        throw err;
    })
}


function updateWallet(param, value, currencyForeignName, currencyForeignValue)
{
    // var obj, currency;
    // obj = _.omit(value, 'PLN');
    // currency = _.keys(obj)[0];

    // if (param === 'buy') {
        return db.getClient().then(function (client)
        {
            var query1 = 'UPDATE wallet SET ' + currencyForeignName + ' = ' + currencyForeignValue + ', PLN = PLN - ' + value.PLN + ' WHERE id = 1;';
            return client.query(query1, []).then(function (result)
            {
                return promise.resolve(result.rows);
            }).finally(client.done);
        }).catch(function (err)
        {
            throw err;
        })

    // } else if (param === 'sell') {

    // }
}

function resetWallet()
{
    var wallet = {PLN: 0, EUR: 0, USD: 0, GBP: 0, CHF: 0}
}

module.exports = {
    getWallet: getWallet, startValue: startValue, updateWallet: updateWallet, resetWallet: resetWallet, getCurrency: getCurrency
};
