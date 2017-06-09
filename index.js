var johnyFive = require('johnny-five');
var sql = require('mssql');


var board = new johnyFive.Board();

const dbConfig = {
    user: 'sa',
    password: 'P@55w0rd',
    server: 'localhost',
    database: 'SpaceBalloon'
};

var connectionPool = new sql.ConnectionPool(dbConfig, function (err) {
    if (err) {
        console.log(err);
        throw err;
    }

    console.log('connected to database')

    board.on('ready', function () {
        var tempInternal = new johnyFive.Thermometer({
            controller: 'LM35',
            pin: 'A1',
            freq: 500
        });

        // change
        tempInternal.on('data', function () {
            console.log(this.celsius);
            console.log(this.fahrenheit);

            var query = 'INSERT INTO dbo.InternalSensorMeasurement ' + 
                '(Celsius, Fahrenheit, CaptureTime) ' + 
                'VALUES ' + 
                '(@Celsius, @Fahrenheit, @CaptureTime)';

            connectionPool.request()
                .input('Celsius', sql.Numeric(7, 2), this.celsius)
                .input('Fahrenheit', sql.Numeric(7, 2), this.fahrenheit)
                .input('CaptureTime', sql.DateTime2, new Date())
                .query(, function (err, results) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }

                    console.log('inserted data!')
                })
        });
    });
});

