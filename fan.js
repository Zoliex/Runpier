const Gpio = require("pigpio").Gpio;
const fs = require("fs");
const sleep = require("util").promisify(setTimeout);

const FAN_PIN = 21; // GPIO pin connected to the fan
const TACHO_PIN = 18; // GPIO pin connected to the fan's tachometer output
const WAIT_TIME = 1000; // 1 second
const FAN_MIN = 20; // 20%
const PWM_FREQ = 25; // 25 Hz

const tempSteps = [50, 70]; // 50°C and 70°C
const speedSteps = [0, 100]; // 0% and 100%
const hyst = 1;

const fan = new Gpio(FAN_PIN, { mode: Gpio.OUTPUT });
const tachometer = new Gpio(TACHO_PIN, {
  mode: Gpio.INPUT,
  edge: Gpio.RISING_EDGE,
});

fan.pwmFrequency(PWM_FREQ);
fan.pwmWrite(0);

let cpuTemp = 0;
let fanSpeed = 0;
let cpuTempOld = 0;
let fanSpeedOld = 0;
let rpm = 0;

function calculateFanSpeed(cpuTemp) {
  let newFanSpeed = 0;

  if (Math.abs(cpuTemp - cpuTempOld) > hyst) {
    if (cpuTemp < tempSteps[0]) {
      newFanSpeed = speedSteps[0];
    } else if (cpuTemp >= tempSteps[tempSteps.length - 1]) {
      newFanSpeed = speedSteps[speedSteps.length - 1];
    } else {
      for (let i = 0; i < tempSteps.length - 1; i++) {
        if (cpuTemp >= tempSteps[i] && cpuTemp < tempSteps[i + 1]) {
          newFanSpeed = Math.round(
            ((speedSteps[i + 1] - speedSteps[i]) /
              (tempSteps[i + 1] - tempSteps[i])) *
              (cpuTemp - tempSteps[i]) +
              speedSteps[i]
          );
        }
      }
    }
  }

  return newFanSpeed;
}

function calculateRPM(pulseCount) {
  const pulsesPerRevolution = 2; // For a fan with one pulse per rotation
  const msPerMinute = 60000; // Milliseconds in a minute
  return (pulsesPerRevolution * msPerMinute) / pulseCount;
}

async function controlFan() {
  try {
    tachometer.on("alert", (level, tick) => {
      rpm = calculateRPM(tick);
    });

    while (true) {
      const cpuTempFile = await fs.promises.readFile(
        "/sys/class/thermal/thermal_zone0/temp",
        "utf-8"
      );
      cpuTemp = parseFloat(cpuTempFile) / 1000;

      fanSpeed = calculateFanSpeed(cpuTemp);

      if (fanSpeed !== fanSpeedOld) {
        if (
          fanSpeed !== fanSpeedOld &&
          (fanSpeed >= FAN_MIN || fanSpeed === 0)
        ) {
          fan.pwmWrite(Math.round((fanSpeed / 100) * 255));
          fanSpeedOld = fanSpeed;
        }
      }
      cpuTempOld = cpuTemp;

      await sleep(WAIT_TIME);
    }
  } catch (error) {
    console.error("Error:", error);
    fan.digitalWrite(0);
    fan.pwmWrite(0);
    tachometer.digitalWrite(0);
  }
}

process.on("SIGINT", () => {
  console.log("Fan control interrupted by keyboard");
  fan.digitalWrite(0);
  fan.pwmWrite(0);
  tachometer.digitalWrite(0);
  process.exit();
});

module.exports = {
  controlFan,
  getRPM: () => rpm, // Export the RPM value for external use
  getFanSpeed: () => fanSpeed,
};
