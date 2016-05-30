var Cylon = require('cylon');
var ENV=require("./env");


var create=function(work){
    
    var client=Cylon.robot({
    connections:{
        arduino:{adaptor:"firmata", port:ENV.PORT}
    },
    devices:{
        sensor:{
            driver:"analog-sensor", pin:0, lowerLimit:100, upperLimit:900
        }
    },
    
    work:function(board){
   
        every((ENV.TIME).second(), function(){
            var value=board.sensor.analogRead();
            var obj={
                board:board,
                value:value
            }
           work(obj);
        });
    }
});
return client;
}


module.exports=create;