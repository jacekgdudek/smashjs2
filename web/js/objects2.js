
//-------------------------------------------
//
// initialize objects
//---------------------

//init stages
var currPlayers = new Array();
var currStage = new Object();
var stages = new Array();

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
			myRoot = eval('(' + allText + ')');
			console.log(myRoot.game.stage.visual.length);
			parseObjects(myRoot);
	    }
	  }
	}
	txtFile.send(null);
}

function parseObjects(myRoot)
{
	for(var i = 0 ; i < 1; i++)
	{
		var isCurrent = true; // to do read from file
		var name = "game_canvas"; // to be read from file
		var stageObj = new Object();
		stageObj.stage = new createjs.Stage( name );

		//---------------------------------------------init visuals
		var visuals = new Array();
		var players = new Array();
		var playerCounter = 0;
		for(var j = 0 ; j < myRoot.game.stage.visual.length  ; j++)
		{
			var visual 		= new Object(); 

			if(j == 0)
			{
				visual.srcFile 	= 'assets/bg/bg.jpg'; // to be read from file
				visual.visName 	= 'bkg'; // to be read from file
			}
			else if(j == 1)
			{
				visual.srcFile 	= 'assets/player/stethoscope.png'; // to be read from file
				visual.visName 	= 'sthetoscope'; // to be read from file
			}
			else if(j == 2)
			{
				visual.srcFile 	= 'assets/player/knob.png'; // to be read from file
				visual.visName 	= 'knob'; // to be read from file
			}
			
			if(j == 0)
			{
				var isPlayer	= false;
			}
			else
			{
				var isPlayer	= true;
			}

			visual.image 		= new Image();
			visual.bitmap;

			//init background
	    	visual.image.src    	= visual.srcFile;
			visual.image.name	 	= visual.visName;

			visual.bitmap 			= new createjs.Bitmap(visual.image);

			if(isPlayer)
			{
				players[playerCounter] = visual;
				playerCounter++;
			}
			else
			{
				visuals[j-playerCounter] 		= visual;
			}

			stageObj.stage.addChild(visual.bitmap);
			stageObj.stage.update(); // maybe not?
		}
		stageObj.visuals = visuals;
		stageObj.players = players;



		stages[i] = stageObj;

		if(isCurrent)
		{
			currPlayers = stageObj.players;
			currStage = stageObj;
		}
	}
}