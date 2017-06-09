var johnyFive = require('johnny-five');

var board = new johnyFive.Board();

board.on('ready', function () {
    var tempInternal = new johnyFive.Therometer({
        controller: 'LM35',
        pin: 'A1'
    });

    tempInternal.on('change', function () {

    });
});