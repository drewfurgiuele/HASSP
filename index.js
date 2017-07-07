"use strict";

const sql = require('mssql');

const getConnectionPool = require('./lib/getConnectionPool');
const createBoard = require('./lib/createBoard'); 

const InternalThermometer = require('./lib/InternalThermometer');
const InternalThermometerDataRecorder = require('./lib/InternalThermometerDataRecorder');

const Accelerometer = require('./lib/Accelerometer');
const AccelerometerDataRecorder = require('./lib/AccelerometerDataRecorder');

const DigitalPressureSensor280 = require('./lib/DigitalPressureSensorBmp280');
const DigitalPressureSensor180 = require('./lib/DigitalPressureSensorBmp180');
const ExternalSensorDataRecorder = require('./lib/ExternalSensorDataRecorder');

const GpsSensor = require('./lib/GpsSensor');
const GpsSensorDataRecorder = require('./lib/GpsSensorDataRecorder');

const Led = require('./lib/Led');

getConnectionPool(function (connectionPool) {

    createBoard(function () {
        const internalThermometer = new InternalThermometer();
        const internalThermometerDataRecorder = 
            new InternalThermometerDataRecorder(connectionPool);

        const accelerometer = new Accelerometer();
        const accelerometerDataRecorder = 
            new AccelerometerDataRecorder(connectionPool);

        const digitalPressureSensorOne = new DigitalPressureSensor180();
        const digitalPressureSensorTwo = new DigitalPressureSensor280();
        const externalSensorDataRecorder = new ExternalSensorDataRecorder(connectionPool);

        const gpsSensor = new GpsSensor();
        const gpsSensorDataRecorder = new GpsSensorDataRecorder(connectionPool);

        const led = new Led();

        internalThermometer.onDataChange(function (data) {
            internalThermometerDataRecorder.recordData(data);
        });

        accelerometer.onDataChange(function (data) {
            accelerometerDataRecorder.recordData(data);
        });

        digitalPressureSensorOne.onDataChange(function (data) {
            externalSensorDataRecorder.recordData(data);
        });

        digitalPressureSensorTwo.onDataChange(function (data) {
            externalSensorDataRecorder.recordData(data);
        });

        altimeterSensor.onDataChange(function (data) {
            altimeterDataRecorder.recordData(data)
        });

        gpsSensor.onDataChange(function (data) {
            gpsSensorDataRecorder.recordData(data);
        });

        led.blink();

        internalThermometer.run();
        accelerometer.run();
        digitalPressureSensorOne.run();
        digitalPressureSensorTwo.run();
        gpsSensor.run();
    });
});

