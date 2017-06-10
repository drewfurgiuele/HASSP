"use strict";

const DataRecorder = require('./DataRecorder');
const sql = require('mssql');
const errorHandler = require('./errorHandler');

class AccelerometerDataRecorder extends DataRecorder {
    _logData(connectionPool, data) { 
        var query = 'INSERT INTO dbo.AccelerometerMeasurements ' + 
            '(X, Y, Z, Pitch, Roll, Acceleration, Inclination, Orientation, CaptureTime) ' + 
            'VALUES ' + 
            '(@X, @Y, @Z, @Pitch, @Roll, @Acceleration, @Inclination, ' + 
            '@Orientation, @CaptureTime)';

        connectionPool.request()
            .input('X', sql.Numeric(7, 2), data.X)
            .input('Y', sql.Numeric(7, 2), data.Y)
            .input('Z', sql.Numeric(7, 2), data.Z)
            .input('Pitch', sql.Numeric(7, 2), data.Pitch)
            .input('Roll', sql.Numeric(7, 2), data.Roll)
            .input('Acceleration', sql.Numeric(20, 16), data.Acceleration)
            .input('Inclination', sql.Numeric(20, 16), data.Inclination)
            .input('Orientation', sql.Numeric(20, 16), data.Orientation)
            .input('CaptureTime', sql.DateTime2, data.CaptureTime)
            .query(query, function (err, results) {
                if (err) {
                    errorHandler(err);
                }
            });
    }
}

module.exports = AccelerometerDataRecorder;