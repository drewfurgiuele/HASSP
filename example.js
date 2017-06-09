var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
	var accelerometer = new five.Accelerometer({
		controller: "ADXL345"
	});

	var tempInternal = new five.Thermometer({
		controller: "LM35",
		pin: "A1"
	});

	var multi = new five.Multi({
		controller: "BMP280"
	});

	accelerometer.on("change", function() {
		console.log("accelerometer");
		console.log(" x			:", this.x);
		console.log(" y			:", this.y);
		console.log(" z			:", this.z);
		console.log(" pitch:		:", this.pitch);
		console.log(" roll:		:", this.roll);
		console.log(" acceleration	:", this.acceleration);
		console.log(" inclanation	:", this.inclination);
		console.log(" orientation	:", this.orientation);
		console.log("---------------------------------------");
	});

	tempInternal.on("change", function() {
		console.log("Internal tempature")
		console.log(" Celsius		: ", this.celsius);
		console.log(" Fahrenheit	: ", this.fahrenheit);
		console.log("---------------------------------------");
	})

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
