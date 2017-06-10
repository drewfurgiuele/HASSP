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
            .input('X', sql.Numeric(7, 2), data.x)
            .input('Y', sql.Numeric(7, 2), data.y)
            .input('Z', sql.Numeric(7, 2), data.z)
            .input('Pitch', sql.Numeric(7, 2), data.pitch)
            .input('Roll', sql.Numeric(7, 2), data.roll)
            .input('Acceleration', sql.Numeric(20, 16), data.acceleration)
            .input('Inclination', sql.Numeric(20, 16), data.inclination)
            .input('Orientation', sql.Numeric(20, 16), data.orientation)
            .input('CaptureTime', sql.DateTime2, data.captureTime)
            .query(query, function (err, results) {
                if (err) {
                    errorHandler(err);
                }
            });
    }
}

module.exports = AccelerometerDataRecorder;