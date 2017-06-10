"use strict";

const DataRecorder = require('./DataRecorder');
const sql = require('mssql');

class InternalThermometerDataRecorder extends DataRecorder {
    _logData(connectionPool, data) { 
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
    }
}

module.exports = InternalThermometerDataRecorder;