var sensorLib = require('node-dht-sensor');
var env = require("./env");
var unirest = require("unirest");

var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "ClientID": env.credentials2.client_id,
    "ClientSecret": env.credentials2.client_secret
}

var send = function (obj) {

    unirest.post(env.PUSH_HOST + "/sensor_grid")
        .headers(headers)
        .send(obj)
        .end();

}


try {
    setInterval(function () {

        var b = sensorLib.readSpec(11, 4);
        var temperature = b.temperature;
        var humidity = b.humidity;
        console.log("Value at " + (new Date()) + ": " + temperature + "C, " + humidity + "%");
        var obj = {
            data: [{
                node_id: env.sensors2.temperature,
                value: temperature + ""
            },
                {
                    node_id: env.sensors2.humidity,
                    value: humidity + ""
                }]
        };


        send(obj);


    }, 5000);
} catch (err) {
    console.log(err);
}