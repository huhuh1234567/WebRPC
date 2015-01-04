/**
 * author:	胡剑青 huhuh1234567@126.com
 * date:	2014.12
 * vm:		node
 */

var Server = require("./Server.js");
Server({
	host: "127.0.0.1",
	port: 8080,
	procedure: {
		"/echo": function(str,cb){
			cb(null,"hello "+str);
		},
		"/sqrt": function(num,cb){
			if(num<0){
				cb("argument should not less than zero");
			}
			else{
				cb(null,Math.sqrt(num));
			}
		}
	}
});
console.log("server started");