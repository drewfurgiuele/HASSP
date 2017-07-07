"use strict";

const DataRecorder = require('./DataRecorder');
const sql = require('mssql');
const errorHandler = require('./errorHandler');

class GpsSensorDataRecorder extends DataRecorder {
    _logData(connectionPool, data) { 
        var query = 'INSERT INTO dbo.GpsMeasurements ' + 
            '(Latitude, Longitude, Altitude, CaptureTime) ' + 
            'VALUES ' + 
            '(@Latitude, @Longitude, @Altitude, @CaptureTime);

        connectionPool.request()
            .input('Latitude', sql.Numeric(18, 4), data.latitude)
            .input('Longitude', sql.Numeric(18, 4), data.longitude)
            .input('Altitude', sql.Numeric(18, 4), data.altitude)
            .input('CaptureTime', sql.DateTime2, data.captureTime)
            .query(query, function (err, results) {
                if (err) {
                    errorHandler(err);
                }
            });
    }
}

module.exports = GpsSensorDataRecorder;