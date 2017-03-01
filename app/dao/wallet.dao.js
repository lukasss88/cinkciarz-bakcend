'use strict';

var db = require('../service/db');
var _ = require('lodash');
var promise = require('bluebird');

// var wallet = {PLN: 0, EUR: 0, USD: 0, GBP: 0, CHF: 0};

function getWallet()
{
    return db.getClient().then(function (client)
    {
        var query = 'SELECT * FROM wallet ORDER BY id;';
        return client.query(query, []).then(function (result)
        {
            console.log(result);
            return result.rows
        }).finally(client.done)
    }).catch(function (err)
    {
        throw err;
    })
}
// return db.getClient().then(function (client)
// {
//     var query = 'SELECT * FROM author;';
//     return client.query(query, []).then(function (result)
//     {
//         return result.rows;
//     }).finally(client.done);
// }).catch(function (error)
// {
//     throw error;
// });

function startValue(value)
{
    // wallet.PLN = value
    return db.getClient().then(function (client)
    {
        var query = 'UPDATE wallet SET currency_value = ' + value +' WHERE id = 1;';
        return client.query(query, []).then(function (result)
        {

            return promise.resolve(result.rows);
        }).finally(client.done);
    }).catch(function (err)
    {
        throw err;
    })

}

function updateWallet(param, value)
{
    var obj, currency;
    obj = _.omit(value, 'PLN');
    currency = _.keys(obj)[0];

    if (param === 'buy') {
        wallet.PLN -= value.PLN;
        wallet[currency] += obj[currency];
    } else if (param === 'sell') {
        wallet.PLN += value.PLN;
        wallet[currency] -= obj[currency];
    }
}

function resetWallet()
{
    var wallet = {PLN: 0, EUR: 0, USD: 0, GBP: 0, CHF: 0}
}

module.exports = {
    getWallet: getWallet, startValue: startValue, updateWallet: updateWallet, resetWallet: resetWallet
};
