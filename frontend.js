$(document).ready(function(){ 
	$("#submit").click(function(){
		console.log("wow");
        	$.ajax({
      			type: "POST",
                	data:{
                		document.getElementById("command").value
                	}
                	success: function(){
                		console.log("I did it");
                	}
        	});
	});
});

function alertMe(){
	alert("Hello man");
}
