'use strict';

var _ = require('lodash');

var wallet = {PLN: 0, EUR: 0, USD: 0, GBP: 0, CHF: 0};

function getWallet()
{
    return wallet;
}

function startValue(value)
{
    wallet.PLN = value
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
    _.forEach(wallet, function (value, key)
    {
        wallet[key] = 0;
    });
}

module.exports = {
    getWallet: getWallet, startValue: startValue, updateWallet: updateWallet, resetWallet: resetWallet
};

