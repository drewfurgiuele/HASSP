"use strict";

const johnyFive = require('johnny-five');
const getConfig = require('./getConfig');

module.exports = function (callback) {
    const isDebug = getConfig().debug;
    const board = new johnyFive.Board({
        repl: isDebug,
        debug: isDebug
    });

    board.on('ready', function () {
        callback();
    });
};