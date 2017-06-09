var johnyFive = require('johnny-five');
var sql = require('mssql');


var board = new johnyFive.Board();

const dbConfig = {
    user: 'sa',
    password: 'P@55w0rd',
    server: 'localhost',
    database: 'SpaceBallon'
};

var connectionPool = new sql.ConnectionPool(dbConfig, function (err) {
    if (err) {
        console.log(err);
        throw err;
    }

    pool.request.query('select * from dbo.InternalSensorMeasurements', function (err, results) {
        if (err) {
            console.log(err);
            throw err;
        }

        console.log('got data!')
    });
});

board.on('ready', function () {
    var tempInternal = new johnyFive.Thermometer({
        controller: 'LM35',
        pin: 'A1',
        freq: 500
    });

    tempInternal.on('change', function () {
        console.log(this.celsius);
    });
});