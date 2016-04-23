var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

var credentials={
  client_id:"a7e409d4-f433-4b80-5dd9-c0a49626d550",
  client_secret:"aKuOcmIHnNmyFfJbGjhLruBUHyRCjQlHNcgJgHWOppVcpRU"
}


var sensorData={
    "data":[
        {
            "node_id":"fa8c7695-3051-46ef-41c0-7006a9aa6df8",
            "value":"5254254"
        },
        {
            "node_id":"4643d9ae-78c6-436d-4007-c24d2546d068",
            "value":"5552"
        }
        ]
}
var interval=null;




function Data(cb){
  return function(message){
    if (message.type === 'utf8') {
      cb(JSON.parse(message.utf8Data));
    }
  }
}

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket client connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', Data(function(data){
        if(data.status==0){
          console.log(data);
          if(interval==void 0){

            interval=setInterval(function () {

              connection.send(JSON.stringify(sensorData));


            }, 5000);

            setTimeout(function () {
               clearInterval(interval);
               connection.close();
            }, 30000);

          }


        }
    }));

    connection.send(JSON.stringify(credentials));
});

client.connect('ws://127.0.0.1:5065/sensor_grid', "", "http://localhost:5065");
