var walletDAO = require('../dao/wallet.dao');
var _ = require('lodash');

function startValue(value)
{
    return walletDAO.startValue(value)
}

function getWallet()
{
    return walletDAO.getWallet();
}

function updateWallet(param, currencyToExchange)
{
    var currencyForeign;
    var currencyForeignName;
    var currencyForeignValue;
    var plnValue;
    currencyForeign = _.omit(currencyToExchange, 'PLN');
    currencyForeignName = _.keys(currencyForeign)[0];
    if (param === 'buy') {
        return walletDAO.getCurrency(currencyForeignName).then(function (result)
        {
            currencyForeignValue = result[currencyForeignName] + currencyForeign[currencyForeignName];
            return walletDAO.getCurrency('PLN');
        }).then(function (result)
        {
            plnValue = result.PLN - currencyToExchange.PLN;
            return walletDAO.updateWallet(currencyForeignName, currencyForeignValue, plnValue);
        });
    } else if (param === 'sell') {
        walletDAO.getCurrency(currencyForeignName).then(function (result)
        {
            currencyForeignValue = result[currencyForeignName] - currencyForeign[currencyForeignName];
            walletDAO.getCurrency('PLN').then(function (result)
            {
                plnValue = result.PLN + currencyToExchange.PLN;
                walletDAO.updateWallet(currencyForeignName, currencyForeignValue, plnValue);
            });
        });
    }
}

function resetWallet()
{
    return walletDAO.resetWallet();
}

module.exports = {
    startValue: startValue, getWallet: getWallet, updateWallet: updateWallet, resetWallet: resetWallet
};
