"use strict";

const getConnectionPool = require('./lib/getConnectionPool');

console.log('Preparing to pull all rows');

getConnectionPool(function (connectionPool) {
    
    connectionPool.request()
        .query('SELECT COUNT(*) As cnt FROM dbo.GpsMeasurements', function (err, result) {
            if (err) {
                console.log('Unable to query dbo.GpsMeasurements');
            } else {
                console.log("GpsMeasurements: " + result.recordset[0].cnt);
            }
        });

    connectionPool.request()
        .query('SELECT COUNT(*) As cnt FROM dbo.AccelerometerMeasurements', function (err, result) {
            if (err) {
                console.log('Unable to query dbo.AccelerometerMeasurements');
            } else {
                console.log("AccelerometerMeasurements: " + result.recordset[0].cnt);
            }
        });

    connectionPool.request()
        .query('SELECT COUNT(*) As cnt FROM dbo.ExternalSensorMeasurements', function (err, result) {
            if (err) {
                console.log('Unable to query dbo.ExternalSensorMeasurements');
            } else {
                console.log("ExternalSensorMeasurements: " + result.recordset[0].cnt);
            }
        });

    connectionPool.request()
        .query('SELECT COUNT(*) As cnt FROM dbo.InternalSensorMeasurements', function (err, result) {
            if (err) {
                console.log('Unable to query dbo.InternalSensorMeasurements');
            } else {
                console.log("InternalSensorMeasurements: " + result.recordset[0].cnt);
            }
        });
});