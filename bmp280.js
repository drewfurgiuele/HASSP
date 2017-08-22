var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
	var multi = new five.Multi({
		controller: "BMP280"
	});

	multi.on("change", function() {
		console.log("Thermometer");
		console.log(" Celsius		:", this.thermometer.celsius);
		console.log(" Fahrenheit	:", this.thermometer.fahrenheit);
		console.log(" Kelvin		:", this.thermometer.kelvin);
		console.log("");
		console.log("Barmoeter")
		console.log(" Pressure		:", this.barometer.pressure);
		console.log("");
		console.log("Altimeter")
		console.log(" Feet		:", this.altimeter.feet);
		console.log(" Meters 		:", this.altimeter.meters);
		console.log("----------------------------------------");
	});
});
