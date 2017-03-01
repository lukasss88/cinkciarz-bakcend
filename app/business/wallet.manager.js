var walletDAO = require('../dao/wallet.dao');

function startValue(value)
{
    return walletDAO.startValue(value)
}

function getWallet()
{
    return walletDAO.getWallet();
}

function updateWallet(param, value)
{
    walletDAO.updateWallet(param, value)
}

function resetWallet()
{
    walletDAO.resetWallet();
}

module.exports = {
    startValue: startValue, getWallet: getWallet, updateWallet: updateWallet, resetWallet: resetWallet
};
