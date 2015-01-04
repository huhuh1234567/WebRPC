/**
 * author:	胡剑青 huhuh1234567@126.com
 * date:	2014.12
 * vm:		web
 */

(function(){

	window.RPC = window.RPC||{};

	RPC.ajax = function(url,data,callback){
		var xhr = new XMLHttpRequest();
		xhr.onload = function(){
			if(callback){
				if(xhr.status===200){
					callback(null,JSON.parse(xhr.responseText));
				}
				else{
					callback("[HTTP "+xhr.status+"] "+xhr.responseText);
				}
			}
		};
		xhr.onerror = function(){
			if(callback){
				callback("ajax error");
			}
		};
		xhr.ontimeout = function(){
			if(callback){
				callback("ajax timeout");
			}
		};
		xhr.open("post",url,true);
		xhr.setRequestHeader("Content-Type","text/plain");
		xhr.send(JSON.stringify(data));
	}

})();