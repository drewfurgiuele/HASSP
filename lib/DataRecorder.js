"use strict";

class DataRecorder {
    constructor(connectionPool) {
        this._connectionPool = connectionPool;
    }

    recordData(data) {
        const callback = function() {
            this._logData(this._connectionPool, data);
        }

        callback = callback.bind(this);

        process.nextTick(callback);
    }

    _logData(connectionPool, data) { }
}

module.exports = DataRecorder;