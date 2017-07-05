"use strict";

const DataRecorder = require('./DataRecorder');
const sql = require('mssql');
const errorHandler = require('./errorHandler');

class AltimeterDataRecorder extends DataRecorder {
    _logData(connectionPool, data) { 
        var query = 'INSERT INTO dbo.AltimeterMeasurements (Feet, Meters) VALUES (@Feet, @Meters)'

        connectionPool.request()
            .input('Feet', sql.Numeric(18, 4), data.altitudeFeet)
            .input('Meters', sql.Numeric(18, 4), data.altitudeMeters)
            .query(query, function (err, results) {
                if (err) {
                    errorHandler(err);
                }
            });
    }
}

module.exports = AltimeterDataRecorder;