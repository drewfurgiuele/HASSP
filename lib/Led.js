"use strict";
const johnyFive = require('johnny-five');

class Led {
    constructor() {
        this._led = new johnyFive.Led(13);
    }

    blink() {
        this._led.blink(500);
    }
}