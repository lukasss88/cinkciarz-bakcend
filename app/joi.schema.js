var Joi = require('joi');
module.exports = {
    schema: {
        type: Joi.valid("buy", "sell").required()
    }
};


