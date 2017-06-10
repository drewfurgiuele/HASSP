const sql = require('mssql');

const getConfig = require('./getConfig');
const errorHandler = require('./errorHandler');

module.exports = function (callback) {
    const dbConfig = getConfig().database;

    var connectionPool = new sql.ConnectionPool(dbConfig, function (err) {
        if (err) {
            errorHandler(err);
        } else {
            callback(connectionPool);
        }
    });
};