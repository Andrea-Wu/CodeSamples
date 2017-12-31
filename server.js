var http = require("http");
var fs = require("fs");

var querystring = require('querystring');


//copied from stackoverflow
function processPost(request, response, callback) {
	var queryData = "";

 
	request.on('data', function(data) {
        	queryData += data;
        	if(queryData.length > 1e6) { //prevents extremely long inputs
                	queryData = "";
                	response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                	request.connection.destroy();
            	}
        });

        request.on('end', function() {
            request.post = queryData;
            callback();
        });
}

http.createServer(function(request,response){
	if(request.method == "GET"){
		fs.readFile("index.html", function(err,data){
        		response.writeHead(200, {'Content-Type': 'text/html'});
       			response.write(data);
			//console.log("hehe");
        		response.end();
		});
	}

	else if(request.method == 'POST'){
		processPost(request, response, function(){
			console.log(request.post);
			
			response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
            		response.end();

		});
	}
}).listen(3000);

console.log("Server is running!");



//need to output to command line whenever 
//form is submitted...



