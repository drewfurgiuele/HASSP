"use strict";

const DataRecorder = require('./DataRecorder');
const sql = require('mssql');
const errorHandler = require('./errorHandler');

class InternalThermometerDataRecorder extends DataRecorder {
    _logData(connectionPool, data) { 
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
                    errorHandler(err);
                }
            });
    }
}

module.exports = InternalThermometerDataRecorder;