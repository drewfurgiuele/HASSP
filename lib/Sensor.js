"use strict";

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

        this._sensor.on('change', function () {
            var data = self._getData(this);
            data.captureTime = new Date();

            self._callback(data);
        });
    }

    _createSensor() { }

    _getData(sensor) { }
}

module.exports = Sensor;