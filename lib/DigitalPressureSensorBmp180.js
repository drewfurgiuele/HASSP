"use strict";

const johnyFive = require('johnny-five');
const Sensor = require('./Sensor');
const getConfig = require('./getConfig')

class DigitalPressureSensorBmp180 extends Sensor {
    constructor() {
        super();
    }

    _createSensor() {
        return new johnyFive.Multi({
            controller: "BMP180"
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
            sensorName: "BMP180"
        }
    }

    _requiresThrottle() {
        return true;
    }
}

module.exports = DigitalPressureSensorBmp180;