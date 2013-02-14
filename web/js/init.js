////////////////////////////////////////////
//
//      initialise stuff
//////////////////////////////////////
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

//initialize input arrays
var inputArray = new Array();
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
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//
//  initialise graphics

// //public drawables
// //main stage
// var stage;
// //players
// var stethoscopeImg = new Image();
// var stethoscope;
// var knobImg = new Image();
// var knob;

// //background
// var bkgImg = new Image();
// var bkg;

// var gfxLoaded = 0;

//function init() {
// 	//init stage
// 	stage = new createjs.Stage("game_canvas");
	
// 	//init background
//     bkgImg.src    = 'assets/bg/bg.jpg';
// 	bkgImg.name	 = 'bkg';
//     bkgImg.onload = loadGfx;
	
// 	//init player 0
//     stethoscopeImg.src    = 'assets/player/stethoscope.png';
// 	stethoscopeImg.name	 = 'stethoscope';
//     stethoscopeImg.onload = loadGfx;

//     //init player 2
//     knobImg.src		= 'assets/player/knob.png';
// 	knobImg.name	= 'knob';
//     knobImg.onload	= loadGfx;
	
// 	// stage.addChild(new createjs.Shape()).setTransform(100,100).graphics.f("red").dc(0,0,50);
// 	stage.update();
// 	console.log("initialized graphics!");
// 	pageDidLoad();
// }

// //handling functions
// function loadGfx(e)
// {
// 	if(e.target.name = 'bkg')				{bkg = new createjs.Bitmap(bkgImg);}
// 	if(e.target.name = 'stethoscope')	{stethoscope = new createjs.Bitmap(stethoscopeImg);}
// 	if(e.target.name = 'knob')			{
// 		knob = new createjs.Bitmap(knobImg);
// 		knob.regX = 247; //get width?
// 		knob.regY = 247;
// 	}
	
// 	gfxLoaded++;
	
// 	/* Display graphics until all of them are loaded */
	
// 	if(gfxLoaded == 3)
// 	{
// 		buildInterface();
// 	}
// }

// function buildInterface()
// {
	
// 	stage.addChild(bkg, knob, stethoscope);
// 	stage.update(); // Very Important
// }