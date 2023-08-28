const fan = require("./fan"); // Change the path to match your file structure

fan.controlFan();

setInterval(() => {
  // Call this to get the current fan RPM
  const currentRPM = fanControl.getRPM();
  console.log("Current Fan RPM:", currentRPM);
}, 1000);
