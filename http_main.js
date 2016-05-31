var env = require("./env");
var sensor = require("./sensor");
var conversion = require("./conversion.js");

var unirest = require("unirest");

var headers={
    'Accept': 'application/json', 
    'Content-Type': 'application/json',
    "ClientID":env.credentials.client_id,
    "ClientSecret":env.credentials.client_secret
}

var send=function(obj){
    
    unirest.post(env.PUSH_HOST+"/sensor_grid")
    .headers(headers)
    .send(obj)
    .end();
    
}


sensor(function (board) {

    var value = conversion.LM35ToCelsius(board.value);
    console.log("Value at " + (new Date()) + ": " + value);
    var obj = {
        data: [{
            node_id: env.sensors.temperature,
            value: value + ""
        }]
    };


    send(obj);

}).start();



