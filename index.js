"use strict";

const sql = require('mssql');

const getConnectionPool = require('./lib/getConnectionPool');
const createBoard = require('./lib/createBoard'); 

const InternalThermometer = require('./lib/InternalThermometer');
const InternalThermometerDataRecorder = require('./lib/InternalThermometerDataRecorder');

const Accelerometer = require('./lib/Accelerometer');
const AccelerometerDataRecorder = require('./lib/AccelerometerDataRecorder');

getConnectionPool(function (connectionPool) {

    createBoard(function () {
        const internalThermometer = new InternalThermometer();
        const internalThermometerDataRecorder = 
            new InternalThermometerDataRecorder(connectionPool);

        const accelerometer = new Accelerometer();
        const accelerometerDataRecorder = 
            new AccelerometerDataRecorder(connectionPool);

        internalThermometer.onDataChange(function (data) {
            internalThermometerDataRecorder.recordData(data);
        });

        accelerometer.onDataChange(function (data) {
            accelerometerDataRecorder.recordData(data);
        })

        internalThermometer.run();
        accelerometer.run();
    });
});

