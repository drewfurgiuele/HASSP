"use strict";

const sql = require('mssql');

const getConnectionPool = require('./lib/getConnectionPool');
const createBoard = require('./lib/createBoard'); 

const InternalThermometer = require('./lib/InternalThermometer');
const InternalThermometerDataRecorder = require('./lib/InternalThermometerDataRecorder');

const Accelerometer = require('./lib/Accelerometer');
const AccelerometerDataRecorder = require('./lib/AccelerometerDataRecorder');

const DigitalPressureSensor = require('./lib/DigitalPressureSensor');
const ExternalSensorDataRecorder = require('./lib/ExternalSensorDataRecorder');

const Led = require('./lib/Led');

getConnectionPool(function (connectionPool) {

    createBoard(function () {
        const internalThermometer = new InternalThermometer();
        const internalThermometerDataRecorder = 
            new InternalThermometerDataRecorder(connectionPool);

        const accelerometer = new Accelerometer();
        const accelerometerDataRecorder = 
            new AccelerometerDataRecorder(connectionPool);

        const digitalPressureSensor = new DigitalPressureSensor();
        const externalSensorDataRecorder = new ExternalSensorDataRecorder(connectionPool);

        const led = new Led();

        internalThermometer.onDataChange(function (data) {
            internalThermometerDataRecorder.recordData(data);
        });

        accelerometer.onDataChange(function (data) {
            accelerometerDataRecorder.recordData(data);
        });

        digitalPressureSensor.onDataChange(function (data) {
            externalSensorDataRecorder.recordData(data);
        });

        led.blink();

        internalThermometer.run();
        accelerometer.run();
        digitalPressureSensor.run();
    });
});

