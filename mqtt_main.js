var mosquito = require("./mosquito");
var env = require("./env");
var sensor = require("./sensor");
var conversion = require("./conversion.js");


mosquito(function (publish) {

    sensor(function (board) {

        var value = conversion.LM35ToCelsius(board.value);
        console.log("Value at " + (new Date()) + ": " + value);
        var obj = {
            data: [{
                node_id: env.sensors.temperature,
                value: value + ""
            }]
        };



        publish(obj);



    }).start();


}).start();
