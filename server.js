var http = require("http");
var fs = require("fs");
var pty = require("pty.js");
var querystring = require('querystring');

var myGlobal="";

var term =  pty.spawn('bash', [], {
	name: 'xterm-color',
        cols: 80,
        rows: 100,
        cwd: process.env.HOME, //the f is this?
        env: process.env
});


term.on("data", function(data){
        console.log(data);
	myGlobal = myGlobal+ data;
});




//copied from stackoverflow
function processPost(request, response) {
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

	    	term.write(request.post + "\r");

		//need to create a new event handler that's not called "data"
		//need to find out where term.write is writing to
		//implement the same functionality as term.on("data")

		//OR use a global variaable


            	response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
            	response.end();

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
		processPost(request, response);
	}
}).listen(3000);

console.log("Server is running!");



//need to output to command line whenever 
//form is submitted...e
