"use strict";

const johnyFive = require('johnny-five');
const Sensor = require('./Sensor');
const getConfig = require('./getConfig')

class Accelerometer extends Sensor {
    constructor() {
        super();
    }

    _createSensor() {
        return new new johnyFive.Accelerometer({
            controller: "ADXL345",
            freq: getConfig().sensor.pollingFrequencyMilliseconds
        });
    }

    _getData(sensor) { 
        return {
            x: sensor.x,
            y: sensor.y,
            z: sensor.z,
            pitch: sensor.pitch,
            roll: sensor.roll,
            acceleration: sensor.acceleration,
            inclination: sensor.inclination,
            orientation: sensor.orientation
        }
    }
}

module.exports = Accelerometer;