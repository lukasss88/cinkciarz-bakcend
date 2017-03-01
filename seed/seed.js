'use strict';

var Promise = require('bluebird');
var fs = require('fs');
var db = require('../app/service/db');
var readFile = Promise.promisify(fs.readFile, fs);
var fileNames = ['seed/sql/schema.down.sql', 'seed/sql/schema.up.sql', 'seed/sql/seed.sql'];

function executeSqlQuery(sql)
{
    return db.getClient().then(function (db)
    {
        return db.query(sql).then(function ()
        {
            db.done();
        });
    });
}

function executeSqlFromFile(path)
{
    return readFile(path, {encoding: 'UTF-8'}).then(executeSqlQuery);
}

Promise.reduce(fileNames, function (total, fileName)
{
    return executeSqlFromFile(fileName);
}, 0).then(function ()
{
    console.info('Seeding script finished at ' + new Date());
    process.exit(0);
}).catch(function (error)
{
    console.error(error);
    process.exit(1);
});

