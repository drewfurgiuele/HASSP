"use strict";

class DataRecorder {
    constructor(connectionPool) {
        this._connectionPool = connectionPool;
    }

    recordData(data) {
        var self = this;

        process.nextTick(function () {
            self._logData(self._connectionPool, data);
        });
    }

    _logData(connectionPool, data) { }
}

module.exports = DataRecorder;