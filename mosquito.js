var mqtt = require('mqtt');
var ENV = require("./env");

var create = function (node) {
  var obj = {};
  var client = mqtt.connect(ENV.MQTT, {
    username: ENV.credentials.client_id,
    password: ENV.credentials.client_secret
  });
  client.on("error", function (error) {
    console.log(error);
  });


  var publish=function(data){
    client.publish(ENV.topic, JSON.stringify(data),function(){
      console.log("Data published at: "+(new Date()));
    });
  }
  obj.start = function () {
    client.on('connect', function () {
      console.log("MQTT Connnected");
      
      node(publish);
    });
  };

  obj.client = client;

  return obj;

}


module.exports = create;