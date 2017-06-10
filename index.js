var johnyFive = require('johnny-five');
var sql = require('mssql');

var getConnectionPool = require('./lib/getConnectionPool');

var board = new johnyFive.Board();

getConnectionPool(function (connectionPool) {
    board.on('ready', function () {
        var tempInternal = new johnyFive.Thermometer({
            controller: 'LM35',
            pin: 'A1',
            freq: 50
        });

        tempInternal.on('change', function () {
            console.log(this.celsius);
            console.log(this.fahrenheit);

            var query = 'INSERT INTO dbo.InternalSensorMeasurements ' + 
                '(Celsius, Fahrenheit, CaptureTime) ' + 
                'VALUES ' + 
                '(@Celsius, @Fahrenheit, @CaptureTime)';

            connectionPool.request()
                .input('Celsius', sql.Numeric(7, 2), this.celsius)
                .input('Fahrenheit', sql.Numeric(7, 2), this.fahrenheit)
                .input('CaptureTime', sql.DateTime2, new Date())
                .query(query, function (err, results) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }

                    console.log('inserted data!')
                })
        });
    });
});

