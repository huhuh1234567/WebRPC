(function(){

	window.RPC = window.RPC||{};

	RPC.ajax = function(url,data,successHandler,errorHandler){
		var xhr = new XMLHttpRequest();
		xhr.onload = function(){
			successHandler&&successHandler(JSON.parse(xhr.responseText));
		};
		xhr.onerror = function(){
			errorHandler&&errorHandler(xhr.status,JSON.parse(xhr.responseText));
		};
		xhr.open("post",url,true);
		xhr.setRequestHeader("Content-Type","text/plain");
		xhr.send(JSON.stringify(data));
	}

})();