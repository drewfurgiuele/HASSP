"use strict";

const getConnectionPool = require('./lib/getConnectionPool');

console.log('Preparing to truncate all data');

getConnectionPool(function (connectionPool) {
    
    connectionPool.request()
        .query('TRUNCATE TABLE dbo.GpsMeasurements', function (err) {
            if (err) {
                console.log('Unable to truncate dbo.GpsMeasurements');
            } else {
                console.log('dbo.GpsMeasurements truncated')
            }
        });

    connectionPool.request()
        .query('TRUNCATE TABLE dbo.AccelerometerMeasurements', function (err) {
            if (err) {
                console.log('Unable to truncate dbo.AccelerometerMeasurements');
            } else {
                console.log('dbo.AccelerometerMeasurements truncated')
            }
        });

    connectionPool.request()
        .query('TRUNCATE TABLE dbo.ExternalSensorMeasurements', function (err) {
            if (err) {
                console.log('Unable to truncate dbo.ExternalSensorMeasurements');
            } else {
                console.log('dbo.ExternalSensorMeasurements truncated')
            }
        });

    connectionPool.request()
        .query('TRUNCATE TABLE dbo.InternalSensorMeasurements', function (err) {
            if (err) {
                console.log('Unable to truncate dbo.InternalSensorMeasurements');
            } else {
                console.log('dbo.InternalSensorMeasurements truncated')
            }
        });
});