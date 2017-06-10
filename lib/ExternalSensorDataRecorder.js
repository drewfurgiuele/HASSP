"use strict";

const DataRecorder = require('./DataRecorder');
const sql = require('mssql');
const errorHandler = require('./errorHandler');

class ExternalSensorDataRecorder extends DataRecorder {
    _logData(connectionPool, data) { 
        var query = 'INSERT INTO dbo.AccelerometerMeasurements ' + 
            '(Celsius, Fahrenheit, Kelvin, BarometricPressure, AltitudeFeet, AltitudeMeters, CaptureTime) ' + 
            'VALUES ' + 
            '(@Celsius, @Fahrenheit, @Kelvin, @BarometricPressure, @AltitudeFeet, @AltitudeMeters, @CaptureTime)';

        connectionPool.request()
            .input('Celsius', sql.Numeric(7, 2), data.celsius)
            .input('Fahrenheit', sql.Numeric(7, 2), data.fahrenheit)
            .input('Kelvin', sql.Numeric(7, 2), data.kelvin)
            .input('BarometricPressure', sql.Numeric(18, 4), data.barometricPressure)
            .input('AltitudeFeet', sql.Numeric(18, 4), data.altitudeFeet)
            .input('AltitudeMeters', sql.Numeric(18, 4), data.altitudeMeters)
            .input('CaptureTime', sql.DateTime2, data.captureTime)
            .query(query, function (err, results) {
                if (err) {
                    errorHandler(err);
                }
            });
    }
}

module.exports = ExternalSensorDataRecorder;