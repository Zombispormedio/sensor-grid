var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

var credentials={
  client_id:"7fc9e1d7-a757-4007-7826-b4c9b7c056b0",
  client_secret:"BmJIOExtrRhBuDNGLMDEiHuJURQDFWfSkdMgHCHWeDLFbRj"
}


var sensorData={
    "data":[
        {
            "node_id":"273a8df9-d262-4979-600d-cb758d30627f",
            "value":"5254254"
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

client.connect('ws://smart-town-push.herokuapp.com/sensor_grid', "", "https://smart-town-push.herokuapp.com");
//client.connect('ws://localhost:5065/sensor_grid', "", "http://localhost:5065/sensor_grid");
