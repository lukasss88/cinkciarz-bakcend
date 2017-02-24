var walletDAO = require('../dao/wallet.dao');

function startValue(value)
{
    walletDAO.startValue(value)
}

function getWallet()
{
    return walletDAO.getWallet();
}

function addValue(param, value)
{
    walletDAO.addValue(param, value)
}

function resetWallet()
{
    walletDAO.resetWallet();
}


module.exports = {
    startValue: startValue, getWallet: getWallet, addValue: addValue, resetWallet: resetWallet
};
