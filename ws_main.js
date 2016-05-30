var ws = require("./ws");
var env = require("./env");
var sensor = require("./sensor")
var conversion = require("./conversion.js");

ws(function (conn) {

sensor(function (board) {
    
       
            var value = conversion.LM35ToCelsius(board.value);
            console.log(value);
            var obj = {
                data: [{
                    node_id: env.sensors.temperature,
                    value: value+""
                }]
            };



            conn.send(obj);
     


    }).start();


}).start();





