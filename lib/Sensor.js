"use strict";

const getConfig = require('./getConfig');
const _ = require('lodash');

class Sensor {
    constructor() {
        this._sensor = null;
        this._callback = null;
    }

    onDataChange(callback) {
        this._callback = callback;
    }

    run() {
        this._sensor = this._createSensor();

        var self = this;

        var changeCallback = function () {
            var data = self._getData(this);
            data.captureTime = new Date();

            self._callback(data);
        }

        if (this._requiresdDebounce()) {
            const wait = getConfig().sensor.pollingFrequencyMilliseconds
            changeCallback = _.debounce(changeCallback, wait);
        }

        this._sensor.on('change', changeCallback);
    }

    _createSensor() { }

    _getData(sensor) { }

    _requiresdDebounce() {
        return false;
    }
}

module.exports = Sensor;