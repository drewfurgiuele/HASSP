var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  /*
   * This is the simplest initialization
   * We assume SW_SERIAL0 for the port
   */
  var gps = new five.GPS({
    breakout: "ADAFRUIT_ULTIMATE_GPS",
    pins: {
      rx: 11,
      tx: 10,
    }
  });

  // If latitude, longitude, course or speed change log it
  gps.on("data", function() {
    console.log("position");
    console.log("  latitude   : ", this.latitude);
    console.log("  longitude  : ", this.longitude);
    console.log("--------------------------------------");
  });
});