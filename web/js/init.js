////////////////////////////////////////////
//
//      initialise stuff
//
//////////////////////////////////////

var verboseDebugging = true;
var verbose = true;

//init scenes
var currPlayers = new Array();
var currScene = new Object();
var scenes = new Object();

//setup audio manager
var audioManager;
var transitionsManager;

//booleans
var moduleLoaded = -1;
var flipX = true;

//init inputs
var inputArray = new Array();

function init() {
	currSpecialRewards.push(0);
	currSpecialRewards.push(1);
	loadFlipX();
	if(typeof flipX === 'undefined') flipX = true;
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

		//angle
		fid.startingAngle = 9999;
		fid.startingAngleDelay = 0;
		fid.relative_rotation = -1;
		fid.wasUpdated = false;
		inputArray[i] = fid;
	}

	loadObjects();

	//load sounds
	audioManager = new SmashAndGrabAudioManager();
	audioManager.setVolume(0.95,audioManagerAudioObject.NORMAL_CLICK);
	audioManager.playSound(audioManagerAudioObject.NORMAL_CLICK);

	//init transitions
	transitionsManager = new TransitionsManager();
}
// init sal module
FidtrackModule = null;  // Global application object.
statusText = 'Loading...';

// Indicate load success.
function moduleDidLoad() {
	FidtrackModule = document.getElementById('FidtrackModule');
	moduleLoaded++;
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
//starting angle
function handleMessage(message_event) {
	//reset was updated
	if(useFiducials)
	{
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

				//do some flippin
				if(flipX) x = 640 - x;
				if(flipX) rotation = (-1*rotation)+360;
				if( x < 3000 && x > -3000)
				{ 
					var fidId = parseInt(fidInfo[i]);
					inputArray[fidId].lastx = inputArray[fidId].x;
					inputArray[fidId].lasty = inputArray[fidId].y;
					inputArray[fidId].x = smoothing*x+ (1-smoothing)*inputArray[fidId].lastx ;
					inputArray[fidId].y = smoothing*y + (1-smoothing)*inputArray[fidId].lasty ;
					inputArray[fidId].rotation = rotation;
					inputArray[fidId].wasUpdated = true;

					//update relative angle
					if(inputArray[fidId].startingAngle == 9999) inputArray[fidId].startingAngle = rotation;
					inputArray[fidId].relative_rotation = rotation - inputArray[fidId].startingAngle;
					if(inputArray[fidId].relative_rotation > 360 ) inputArray[fidId].relative_rotation -= 360;
					else if(inputArray[fidId].relative_rotation < 0 ) inputArray[fidId].relative_rotation += 360;
					inputArray[fidId].startingAngleDelay = 0;
				}
				
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
