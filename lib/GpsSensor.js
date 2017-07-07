"use strict";

const johnyFive = require('johnny-five');
const Sensor = require('./Sensor');
const getConfig = require('./getConfig')

class GpsSensor extends Sensor {
    constructor() {
        super();
    }

    _createSensor() {
        return new johnyFive.GPS({
            breakout: "ADAFRUIT_ULTIMATE_GPS",
            pins: {
                rx: 11,
                tx: 10
            },
            freq: getConfig().sensor.pollingFrequencyMilliseconds
        });
    }

    _getData(sensor) { 
        return {
            latitude: sensor.latitude,
            longitude: sensor.longitude,
            altitude: sensor.altitude
        }
    }

    _requiresThrottle() {
        return false;
    }
}

module.exports = GpsSensor;