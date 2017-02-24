var _ = require('lodash');

var wallet = {PLN: 10000000, GPB: 123, EUR: 98};
var data = {PLN: 1200, GPB: 111};

var obj = _.omit(data, 'PLN');
var currency = _.keys(obj)[0];

wallet[currency] -= obj[currency];


console.log(wallet);
