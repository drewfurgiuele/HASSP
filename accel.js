var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
	var accelerometer = new five.Accelerometer({
		controller: "ADXL345"
	});

	accelerometer.on("data", function() {
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
});