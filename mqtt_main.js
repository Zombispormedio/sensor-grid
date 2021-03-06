var mosquito = require("./mosquito");
var env = require("./env");
var sensor = require("./sensor");
var conversion = require("./conversion.js");

require("unirest").get(env.PUSH_HOST).end();

mosquito(function (publish) {

    sensor(function (board) {

        var value = conversion.LM35ToCelsius(board.value);
        console.log("Value at " + (new Date()) + ": " + value);
        var obj = {
            sensor_grid: env.credentials.client_id,
            data: [{
                node_id: env.sensors.temperature,
                value: value + ""
            }]
        };



        publish(obj);



    }).start();


}).start();
