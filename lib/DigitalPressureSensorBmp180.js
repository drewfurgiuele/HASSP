"use strict";

const johnyFive = require('johnny-five');
const Sensor = require('./Sensor');
const getConfig = require('./getConfig')

class DigitalPressureSensorBmp180 extends Sensor {
    constructor() {
        super();
    }

    _createSensor() {
        return new johnyFive.Barometer({
            controller: "BMP180"
        });
    }

    _getData(sensor) { 
        return {
            celsius: 0,
            fahrenheit: 0,
            kelvin: 0,
            barometricPressure: sensor.pressure,
            altitudeFeet: 0,
            altitudeMeters: 0,
            sensorName: "BMP180"
        }
    }

    _requiresThrottle() {
        return true;
    }
}

module.exports = DigitalPressureSensorBmp180;