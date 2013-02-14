
//-------------------------------------------
//
// initialize objects
//---------------------

//init stages
var currPlayers = new Array();
var currScene = new Object();
var scenes = new Object();

var sweetSpot = (function() {
	var scene;
	return { 
		init : function(scene) {
			this.scene = scene;	
			/*this.scene.visuals.stethoscope.x = 640 - inputArray[0].x;
			this.scene.visuals.stethoscope.y = inputArray[0].y;
			this.scene.visuals.knob.x = 300;
			this.scene.visuals.knob.y = 100;*/
		},
		update : function() {
			this.scene.visuals[0].bitmap.rotation = inputArray[2].rotation;
			//stage = new createjs.Stage("game_canvas");
			//stage.update();
			this.scene.stage.update();
			var sceneFinished = false;		
			return sceneFinished;
		}
	};
})();

function loadObjects()
{
	//get access to sructer file
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
}


function setup(gamejson)
{
	scenes = gamejson.game.scenes;
	// For each scene
	for (var i = 0; i < scenes.length; i++) {
		// Set up the stage
		scenes[i].stage = new createjs.Stage( scenes[i].stage_id );
		// For set up the visuals in the scene and attach them to the stage
		for (var j = 0; j < scenes[i].visuals.length; j++) {
			scenes[i].visuals[j].bitmap = new createjs.Bitmap(scenes[i].visuals[j].src);
			scenes[i].stage.addChild(scenes[i].visuals[j].bitmap);
		}
	}
	currScene = 0;
	scenes[currScene].init(scenes[currScene]);
}
