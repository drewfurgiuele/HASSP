var sql = require('mssql');

var getConfig = require('./getConfig');
var errorHandler = require('./errorHandler');

module.exports = function (callback) {
    var dbConfig = getConfig().database;

    var connectionPool = new sql.ConnectionPool(dbConfig, function (err) {
        if (err) {
            errorHandler(err);
        } else {
            callback(connectionPool);
        }
    });
};