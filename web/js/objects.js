
//-------------------------------------------
//
// initialize objects
//---------------------


/* AJAX structure - won't work becase what we have is eval 
function loadObjects() {
	$.ajax({	url: "/smashandgrab/test/js/structure.json",
			success: setup,
			dataType: "json" 
		});
	console.log("Loading objects");
}
*/

//get access to sructer file
/*
function loadObjects() {
	var txtFile = new XMLHttpRequest();
	var allText;
	var myRoot;
	txtFile.open("GET", "https://s3-eu-west-1.amazonaws.com/smashandgrab/test/js/structure.json",true);//http://my.remote.url/myremotefile.txt", true);
	txtFile.onreadystatechange = function() {
	  if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
	    if (txtFile.status === 200) {  // Makes sure it's found the file.
	      	allText = txtFile.responseText;  // Will separate each line into an array
			var gamejson = eval('(' + allText + ')');
			console.log(gamejson.game.scenes[0].visuals.length);
			setup(gamejson);
	    }
	  }
	}
	txtFile.send(null);
}*/

