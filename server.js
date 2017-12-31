var http = require("http");
var fs = require("fs");

var querystring = require('querystring');


//copied from stackoverflow
function processPost(request, response, callback) {
    var queryData = "";
    if(typeof callback !== 'function') return null;

    if(request.method == 'POST') {
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            request.post = querystring.parse(queryData);
            callback();
        });

    }
}

http.createServer(function(request,response){
	if(request.method == "GET"){
		fs.readFile("index.html", function(err,data){
        		response.writeHead(200, {'Content-Type': 'text/html'});
			console.log(data);
       			response.write(data);
			console.log("hehe");
        		response.end();
		});
	}

	else if(request.method == 'POST'){
		processPost(request, response, function(){
			console.log(request.post);
			console.log("!!!!");
			
			response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
            		response.end();

		});
	}
}).listen(3000);

console.log("Server is running!");

var testVar = "";


//need to output to command line whenever 
//form is submitted...



