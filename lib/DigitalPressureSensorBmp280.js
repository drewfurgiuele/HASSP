"use strict";

const johnyFive = require('johnny-five');
const Sensor = require('./Sensor');
const getConfig = require('./getConfig')

class DigitalPressureSensorBmp280 extends Sensor {
    constructor() {
        super();
    }

    _createSensor() {
        return new johnyFive.Multi({
            controller: "BMP280"
        });
    }

    _getData(sensor) { 
        return {
            celsius: sensor.thermometer.celsius,
            fahrenheit: sensor.thermometer.fahrenheit,
            kelvin: sensor.thermometer.kelvin,
            barometricPressure: sensor.barometer.pressure,
            altitudeFeet: sensor.altimeter.feet,
            altitudeMeters: sensor.altimeter.meters,
            sensorName: "BMP280"
        }
    }

    _requiresThrottle() {
        return true;
    }
}

module.exports = DigitalPressureSensorBmp280;