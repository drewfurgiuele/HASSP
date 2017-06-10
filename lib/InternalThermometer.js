"use strict";

const johnyFive = require('johnny-five');
const Sensor = require('./Sensor');
const getConfig = require('./getConfig')

class InternalThermometer extends Sensor {
    constructor() {
        super();
    }

    _createSensor() {
        return new johnyFive.Thermometer({
            controller: 'LM35',
            pin: 'A1',
            freq: getConfig().sensor.pollingFrequencyMilliseconds
        });
    }

    _getData(sensor) { 
        return {
            celsius: sensor.celsius,
            fahrenheit: sensor.fahrenheit
        }
    }
}

module.exports = InternalThermometer;