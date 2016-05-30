var ENV=require("./env");
var WebSocketClient = require('websocket').client;


var Create=function(onmessage){
    
    var obj={};

    obj.client = new WebSocketClient();

    obj.start=start(obj.client, onmessage);
  
    return obj;
}

var connect=function(onmessage){
    return function(connection){
    console.log('WebSocket client connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    
    var sender={};
  sender.send=function(obj){
        connection.send(JSON.stringify(obj))
    }
    sender.close=function(){
        connection.close();
    }
    
    connection.on('message', Data(function(data){
        console.log(data);
         if(data.status==0 && data.type==="login"){
          onmessage(sender);
         }
    }));
    
    sender.send(ENV.credentials);
    
    
};
}

var start=function(client, onmessage){
    return function(){
        client.on('connectFailed', function(error) {
            console.log('Connect Error: ' + error.toString());
        });
        client.on('connect', connect(onmessage));
        client.connect(ENV.WS_HOST, "", ENV.PUSH_HOST);
    };
}

function Data(cb){
  return function(message){
    if (message.type === 'utf8') {
      cb(JSON.parse(message.utf8Data));
    }
  }
}



module.exports=Create;

