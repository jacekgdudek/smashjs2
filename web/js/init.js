////////////////////////////////////////////
//
//      initialise stuff
//////////////////////////////////////

//init scenes
var currPlayers = new Array();
var currScene = new Object();
var scenes = new Object();

//init inputs
var inputArray = new Array();

function init() {

	// initialize input arrays
	for(var i = 0 ; i < 4 ; i++)
	{
		var fid = new Object();
		fid.id = i;
		fid.x = -1;
		fid.y = -1;
		fid.rotation = -1;
		fid.lastx = -1;
		fid.lasty = -1;
		fid.wasUpdated = false;
		inputArray[i] = fid;
	}
	// setupStructure
	scenes = data.game.scenes;
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
	scenes[currScene].init();
}

// init sal module
FidtrackModule = null;  // Global application object.
statusText = 'Loading...';

// Indicate load success.
function moduleDidLoad() {
  FidtrackModule = document.getElementById('FidtrackModule');
  updateStatus('Loaded');
}

//sending pixels to module
function popPixels(imgStr) {
  FidtrackModule = document.getElementById('FidtrackModule');
  FidtrackModule.postMessage(imgStr);
}


//Handle message
messageCount = 0;
var smoothing = 0.1;
function handleMessage(message_event) {
	//reset was updated
	for(var i = 0 ; i < 4 ; i++)
	{
		inputArray[i].wasUpdated = false;
	}
	//parse message
	var fidInfo = message_event.data.split(",");
	if(fidInfo[0] != "")
	{
		for (var i = 0; i < fidInfo.length; i+=4) {
			
			var x = parseInt(fidInfo[i+1]);
			var y = parseInt(fidInfo[i+2]);
			var rotation = parseInt(fidInfo[i+3]);
			if( x < 3000)
			{ 
				var fidId = parseInt(fidInfo[i]);
				inputArray[fidId].lastx = inputArray[fidId].x;
				inputArray[fidId].lasty = inputArray[fidId].y;
				inputArray[fidId].x = smoothing*x+ (1-smoothing)*inputArray[fidId].lastx ;
				inputArray[fidId].y = smoothing*y + (1-smoothing)*inputArray[fidId].lasty ;
				inputArray[fidId].rotation = rotation;
				inputArray[fidId].wasUpdated = true;
			}
			
		}
	}
}

//page didLoad
function pageDidLoad() {
	
  if (FidtrackModule == null) {
	  
	updateStatus('Loading...');
	
  } else {
	  
	updateStatus();
	
  }
}

//update Status on the website
function updateStatus(opt_message) {
  if (opt_message)
	statusText = opt_message;
  var statusField = document.getElementById('status_field');
  if (statusField) {
	statusField.innerHTML = statusText;
  }
}
