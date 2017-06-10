"use strict";

const sql = require('mssql');

const getConnectionPool = require('./lib/getConnectionPool');
const createBoard = require('./lib/createBoard'); 
const InternalThermometer = require('./lib/InternalThermometer');

getConnectionPool(function (connectionPool) {

    createBoard(function () {
        const internalThermometer = new InternalThermometer();

        internalThermometer.onDataChange(function (data) {
            console.log(data.celsius);
            console.log(data.fahrenheit);

            var query = 'INSERT INTO dbo.InternalSensorMeasurements ' + 
                '(Celsius, Fahrenheit, CaptureTime) ' + 
                'VALUES ' + 
                '(@Celsius, @Fahrenheit, @CaptureTime)';

            connectionPool.request()
                .input('Celsius', sql.Numeric(7, 2), data.celsius)
                .input('Fahrenheit', sql.Numeric(7, 2), data.fahrenheit)
                .input('CaptureTime', sql.DateTime2, data.captureTime)
                .query(query, function (err, results) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }

                    console.log('inserted data!')
                });
        });

        internalThermometer.run();
    });
});

