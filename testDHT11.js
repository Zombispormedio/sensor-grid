var sensorLib = require('node-dht-sensor');
var b = sensorLib.readSpec(11, 4);
var temperature = b.temperature;
var humidity = b.humidity;
console.log("Value at " + (new Date()) + ": " + temperature + "C, " + humidity + "%");