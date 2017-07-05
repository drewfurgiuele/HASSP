"use strict";

const johnyFive = require('johnny-five');
const Sensor = require('./Sensor');
const getConfig = require('./getConfig')

class AltimeterSensor extends Sensor {
    constructor() {
        super();
    }

    _createSensor() {
        const config = getConfig();

        return new johnyFive.Altimeter({
            controller: "BMP180",
            elevation: config.initialElevationInMeters
        });
    }

    _getData(sensor) { 
        return {
            altitudeFeet: sensor.feet,
            altitudeMeters: sensor.meters
        }
    }

    _requiresThrottle() {
        return true;
    }
}

module.exports = AltimeterSensor;