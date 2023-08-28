//create an expressjs webserver with socket.io
const path = require("path");

const express = require("express");
const cors = require("cors");
const history = require("connect-history-api-fallback");

const app = express();
const http = require("http").Server(app);

const {
  currentLoad,
  fsSize,
  mem,
  cpuTemperature,
} = require("systeminformation");
//const fan = require("./fan");

const port = process.env.PORT || 4800;

app.use(
  history({
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: function (context) {
          return context.parsedUrl.path;
        },
      },
    ],
  })
);
app.use(cors());

app.use(express.static("dist"));
app.use("/public", express.static("public"));

app.get("/api/apps", async (req, res) => {
  const ipAddress = req.headers.host.split(":")[0];

  const apps = require("./config/apps.json");
  var modifiedJson = JSON.parse(JSON.stringify(apps));

  modifiedJson.forEach((entry) => {
    if (entry.hasOwnProperty("url")) {
      entry.url = entry.url.replace("{host}", ipAddress);
    }
    if (entry.hasOwnProperty("apps")) {
      entry.apps.forEach((app) => {
        app.url = app.url.replace("{host}", ipAddress);
      });
    }
  });

  res.json(modifiedJson);
});

app.get("/api/system", async (req, res) => {
  //get cpu usage in percentage
  const cpu = await currentLoad();
  const disk = await fsSize();
  const memory = await mem();
  const temp = await cpuTemperature();

  res.send({
    fan: {
      value: 0, //fan.getRPM(),
      valuePrct: 0, //fan.getFanSpeed(),
      unit: "rpm",
    },
    cpu: {
      value: cpu.currentLoad,
      valuePrct: cpu.currentLoad,
      unit: "%",
    },
    disk: {
      value: humanFileSize(disk[0].used).value,
      valuePrct: disk[0].use,
      unit: humanFileSize(disk[0].used).unit,
    },
    ram: {
      value: humanFileSize(memory.used).value,
      valuePrct: (memory.used / memory.total) * 100,
      unit: humanFileSize(memory.used).unit,
    },
    temp: {
      value: temp.main ? temp.main : 0,
      valuePrct: (temp.main ? temp.main : 30) - 30,
      unit: "°C",
    },
  });
});

app.get("/api/reboot", async (req, res) => {
  console.log("reboot");
});

app.get("/api/shutdown", async (req, res) => {
  console.log("shutdown");
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});

function humanFileSize(size) {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return {
    value: (size / Math.pow(1024, i)).toFixed(2) * 1,
    unit: ["b", "kb", "Mb", "Gb", "Tb"][i],
  };
}
