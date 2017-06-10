const johnyFive = require('johnny-five');

module.exports = function (callback) {
    const board = new johnyFive.Board();

    board.on('ready', function () {
        callback();
    });
};