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

function updateWallet(param, wallet)
{
    var currencyForeign;
    var currencyForeignName;
    var currencyForeignValue;

    currencyForeign = _.omit(wallet, 'PLN');
    currencyForeignName = _.keys(currencyForeign)[0];

    walletDAO.getCurrency(currencyForeignName).then(function(result){
        console.log(result);
        currencyForeignValue = result[currencyForeignName] + currencyForeign[currencyForeignName]
    });
    // currencyForeignValue =
    walletDAO.updateWallet(param, wallet, currencyForeignName, currencyForeignValue)

}

function resetWallet()
{
    walletDAO.resetWallet();
}

module.exports = {
    startValue: startValue, getWallet: getWallet, updateWallet: updateWallet, resetWallet: resetWallet
};
