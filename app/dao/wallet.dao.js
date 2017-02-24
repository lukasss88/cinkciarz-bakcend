'use strict';

var _ = require('lodash');

var wallets = {PLN: 0, EUR: 0, USD: 0, GBP: 0, CHF: 0};

function getWallet()
{
    return wallets;
}

function startValue(value)
{
    wallets.PLN = value
}

function addValue(param, value)
{
    var obj, currency;
    obj = _.omit(value, 'PLN');
    currency = _.keys(obj)[0];

    if(param === 'buy'){
        wallets.PLN -= value.PLN;
        wallets[currency] += obj[currency];
        console.log("buy");
        console.log("wallets:", wallets);
        console.log("wallets[currency]:", wallets[currency]);
        console.log("obj:", obj);
        console.log("obj[currency]:", obj[currency]);
        console.log("currency:", currency);
    }
    else if(param === 'sell') {
        wallets.PLN += value.PLN;
        wallets[currency] -= obj[currency];
        console.log("sell");
        console.log("wallets:", wallets);
        console.log("wallets[currency]:", wallets[currency]);
        console.log("obj:", obj);
        console.log("obj[currency]:", obj[currency]);
        console.log("currency:", currency);
    }
}

function resetWallet(){
    wallets = {PLN: 0, EUR: 0, USD: 0, GBP: 0, CHF: 0};
}


module.exports = {
    getWallet: getWallet, startValue: startValue, addValue: addValue, resetWallet: resetWallet
};

