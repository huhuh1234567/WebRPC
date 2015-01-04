/**
 * author:	胡剑青 huhuh1234567@126.com
 * date:	2014.12
 * vm:		node
 */

var http = require("http");
var url = require("url");

function Server(config){

	var port = config.port||80;
	var host = config.host||"*";
	var procedure = config.procedure||{};

	var server = http.createServer(function(request,response){
		//utf8
		request.charset = "utf8";
		response.setHeader("Charset","utf-8");
		response.setHeader("Access-Control-Allow-Origin","*");
		response.setHeader("Content-type","text/plain");
		//post
		if(request.method.toLowerCase()==="post"){
			//module
			var path = url.parse(request.url).pathname;
			if((typeof procedure[path]).toLowerCase()==="function"){
				var data = "";
				request.on("data",function(chunk){
					data += chunk;
				});
				request.on("end",function(){
					//arg
					var obj = {};
					try{
						obj = JSON.parse(data);
					}
					catch(e){
						console.log(e);
						response.statusCode = 400;
						response.end();
						return;
					}
					//run
					procedure[path](obj,function(error,rst){
						if(error){
							response.statusCode = 500;
							response.end(error);
						}
						else{
							var str = "";
							try{
								str = JSON.stringify(rst);
							}
							catch(e){
								console.log(e);
								response.statusCode = 500;
								response.end();
								return;
							}
							response.statusCode = 200;
							response.end(str);
						}
					});
				});
			}
			else{
				response.statusCode = 404;
				response.end();
			}
		}
		else{
			response.statusCode = 405;
			response.end();
		}
	});

	server.listen(port,host);
}

module.exports = Server;