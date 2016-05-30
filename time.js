var unirest=require("unirest");
var ENV=require("./env");

var fetch=function(){
	console.log("Push over at: "+(new Date()))
    unirest.get(ENV.registry).end();
}

fetch();

setInterval(fetch, 600000);