class Sensor {
    constructor() {
        this._sensor = null;
        this._callback = null;
    }

    onDataChange(callback) {
        this._callback = callback;
    }

    run() {
        this._sensor = _createSensor();
        this._sensor.on('change', function () {
            var data = _getData(this);
            data.captureTime = new Date();

            this._callback(data);
        });
    }

    _createSensor() { }

    _getData(sensor) { }
}

module.exports = Sensor;