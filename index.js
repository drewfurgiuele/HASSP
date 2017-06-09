var johnyFive = require('johnny-five');

var board = new johnyFive.Board();

board.on('ready', function () {
    var tempInternal = new johnyFive.Thermometer({
        controller: 'LM35',
        pin: 'A1',
        freq: 500
    });

    tempInternal.on('change', function () {
        console.log(this.celsius);
    });
});