
//-------------------------------------------
//
// initialize objects
//---------------------

//init stages
var currPlayers = new Array();
var lastScene = 0;
var currScene = 0;
var scenes = {};

//init enable fiducial control
var useFiducials = false;

//user related
var jobs = {};        //all the possible jobs
var currentJobs = {};	//six set jobs for partiucular base
var currentJob;				//current picked job
var credits = new Object();
var heat = new Object();
var cityGUI = new Object();
var messageGUI = new Object();

//is first city -> no randomizing
var isFirstCity = true;
var cities = {};
var currCity;
var currSpecialRewards = new Array();
var specialRewards = new Array();


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
		},
		finalize : function() {

		}
	};
})();

function loadObjects()
{
	//get access to sructer file
	var txtFile = new XMLHttpRequest();
	var allText;
	var myRoot;
	txtFile.open("GET", "https://s3-eu-west-1.amazonaws.com/smashandgrab/Jacek/js/structure.json",true);//http://my.remote.url/myremotefile.txt", true);
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
	//setup cities
	var _cities = gamejson.game.cities;
	for(var i = 0 ; i < _cities.length ; i ++)
	{
		cities[_cities[i].name] = _cities[i];
		_cities[i].heat = 20;
	}
	currCity = "Edinburgh";
	//setup special rewards
	specialRewards = gamejson.game.specialRewards;
	for(var i = 0 ; i < specialRewards.rewards.length ; i ++)
	{
		specialRewards.rewards[i].thumbnail = new createjs.Bitmap(specialRewards.thumbnails[specialRewards.rewards[i].type].src);
		specialRewards.rewards[i].thumbnail.x = -100;
		specialRewards.rewards[i].thumbnail.y = -100;
	}
	currSpecialRewards.push(0);
	currSpecialRewards.push(1);
	///setup crdits disp
	//--------------------------------------setup credits element
	credits = gamejson.game.elements[0];
	credits.value = 0;
	credits.nextValue = 0;
	credits.bg = new createjs.Bitmap(credits.src);
	credits.bg.x = 0;
	credits.bg.y = 0;
	for (var j = 0; j < credits.subelements.length; j++) {
		credits.subelements[j].bmp = new createjs.Bitmap(credits.subelements[j].src);
		credits.subelements[j].bmp.x = -100;
		credits.subelements[j].bmp.y = -100;
	}
	risk = 0;
	var _scenes = gamejson.game.scenes;
	jobs = gamejson.game.jobs;
	
	if(isFirstCity) currentJobs = gamejson.game.jobs.initialJobs;
	// For each scene
	for (var i = 0; i < _scenes.length; i++) {
		// Set up the stage
		_scenes[i].stage = new createjs.Stage( _scenes[i].stage_id );
		// For set up the visuals in the scene and attach them to the stage
		for (var j = 0; j < _scenes[i].visuals.length; j++) {
			var visual = _scenes[i].visuals[j];
			visual.bitmap = new createjs.Bitmap(visual.src);
			visual.bitmap.x = visual.x;
			visual.bitmap.y = visual.y;
			if(visual.visible == false)
			{
				visual.bitmap.visible = false;
			}
			_scenes[i].stage.addChild(visual.bitmap);
			if (typeof visual.textLines !== 'undefined') {
				for (var k = 0; k < visual.textLines.length; k++) {
					console.log(j);
					visual.textLines[k].textObj = new createjs.Text(visual.textLines[k].text, gamejson.game.font._type, gamejson.game.font._color);
					visual.textLines[k].textObj.x = visual.textLines[k].x + visual.bitmap.x;
					visual.textLines[k].textObj.y = visual.textLines[k].y + visual.bitmap.y;
					_scenes[i].stage.addChild(visual.textLines[k].textObj);
				}
			}
		}
		if (typeof _scenes[i].messages !== 'undefined') {
			for (var j = 0; j < _scenes[i].messages.length; j++) {
				_scenes[i].messages[j].text = new createjs.Text(_scenes[i].messages[j]._text, _scenes[i].messages[j]._font, _scenes[i].messages[j]._color);
	 			_scenes[i].messages[j].text.x = _scenes[i].messages[j].x;
	 			_scenes[i].messages[j].text.y = _scenes[i].messages[j].y;
	 			_scenes[i].messages[j].text.textBaseline = "alphabetic";
				_scenes[i].messages[j].text.lineWidth = _scenes[i].messages[j].lineWidth;

				if(_scenes[i].messages[j].text.getMeasuredWidth() < _scenes[i].messages[j].text.lineWidth)
				{
					_scenes[i].messages[j].text.lineWidth = _scenes[i].messages[j].text.getMeasuredWidth();
				}

				var centeredX;
				if(_scenes[i].messages[j].center_x)
				{
					centeredX = 800/2 - _scenes[i].messages[j].text.lineWidth/2;
					_scenes[i].messages[j].text.x = centeredX;
				}

				console.log(_scenes[i].messages[j].text.getMeasuredHeight());
				_scenes[i].messages[j].bg = new createjs.Shape();
				adjustTextBox(_scenes[i].messages[j].text , _scenes[i].messages[j].bg);
				_scenes[i].messages[j].bg.alpha = 0.5;
				_scenes[i].messages[j].bg.visible = false;
				_scenes[i].messages[j].text.visible = false;
				_scenes[i].stage.addChild(_scenes[i].messages[j].bg,_scenes[i].messages[j].text);
			}
		}
		scenes[_scenes[i]._name] = _scenes[i];
		addCreditsToStage(_scenes[i].stage);
		addHeatToStage(_scenes[i].stage, gamejson);
		addLocationToStage(_scenes[i].stage, gamejson);
		addMessageToStage(_scenes[i].stage, gamejson);
	}
	currScene = _scenes[0]._name;
	console.log(scenes[currScene]._name);
	scenes[currScene].init(scenes[currScene]);

}
function setGUI()
{
	setLocation();
	setHeat();
	setCredits();
	//setMessage();
}
function hideGUI()
{
	hideLocation();
	hideHeat();
	//hideCredits();
}

function addMessageToStage(stage, gamejson)
{
	messageGUI.text = new createjs.Text("", gamejson.game.font._type, gamejson.game.font._color);
	messageGUI.text.x = 0;
	messageGUI.text.y = 360;
	messageGUI.text.textBaseline = "alphabetic";
	messageGUI.lineWidth = 400;

	var centeredX;

	centeredX = 800/2 - messageGUI.text.lineWidth/2;
	messageGUI.text.x = centeredX;

	console.log(messageGUI.text.getMeasuredHeight());
	messageGUI.bg = new createjs.Shape();
	adjustTextBox(messageGUI.text , messageGUI.bg);
	messageGUI.bg.alpha = 0.1;
	messageGUI.bg.visible = false;
	messageGUI.text.visible = false;
	stage.addChild(messageGUI.bg,messageGUI.text);

}

function setMessage(text, delay)
{
	//remove children
	scenes[currScene].stage.removeChild(messageGUI.bg, messageGUI.text);
	//update text
	messageGUI.text.text = text;
	//update position of the text
	messageGUI.text.lineWidth = messageGUI.text.getMeasuredWidth();
	var centeredX = 800/2 - messageGUI.text.lineWidth/2;
	messageGUI.text.x = centeredX;

	//create new bg
	messageGUI.bg = new createjs.Shape();
	adjustTextBox(messageGUI.text , messageGUI.bg);
	//update variables
	messageGUI.bg.alpha = 0.5;
	messageGUI.delay = delay;
	messageGUI.bg.visible = true;
	messageGUI.text.visible = true;
	//add to stage
	scenes[currScene].stage.addChild(messageGUI.bg,messageGUI.text);
}

function addLocationToStage(stage, gamejson)
{
	cityGUI.x = 620;
	cityGUI.y = 7;
	cityGUI.width = 140;
	cityGUI.height = 33;
	//add background
	cityGUI.bg = new createjs.Shape();
	cityGUI.bg.graphics.beginFill("white").drawRect(cityGUI.x, cityGUI.y, cityGUI.width, cityGUI.height); // load from file
	
	//add text
	cityGUI.text = new createjs.Text(currCity, gamejson.game.font._type, "#00FF00");
	cityGUI.text.y = 7;
	cityGUI.text.x = cityGUI.x+cityGUI.width/2-cityGUI.text.getMeasuredWidth()/2;

	//stage.addChild(credits.bg.bmp);
	//init numbers to 0

	stage.addChild(cityGUI.bg, cityGUI.text);
	cityGUI.text.visible = false;
	
}

function setLocation()
{
	cityGUI.text.visible = true;
	cityGUI.bg.visible = true;
	scenes[currScene].stage.removeChild(cityGUI.text);
	cityGUI.text.text = currCity;
	cityGUI.text.x = cityGUI.x+cityGUI.width/2-cityGUI.text.getMeasuredWidth()/2;
	scenes[currScene].stage.addChild(cityGUI.text);
}

function hideLocation()
{
	cityGUI.text.visible = false;
	cityGUI.bg.visible = false;
}

function addHeatToStage(stage, gamejson)
{
	heat.x = 200;
	heat.y = 7;
	heat.width = 400;
	heat.height = 33;
	heat.maxHeat = 200;
	heat.value = cities[currCity].heat;
	heat.nextValue = cities[currCity].heat;
	//add background
	heat.bg = new createjs.Shape();
	heat.bg.graphics.beginFill("white").drawRect(heat.x, heat.y, heat.width, heat.height); // load from file
	
	//add bar
	heat.bar = new createjs.Shape();
	heat.bar.graphics.beginLinearGradientFill(["#F66","#FAA","#F66","D00"], [0,0.3,0.6, 1], 0, 0, 0, heat.height-6).drawRect(heat.x + 10, heat.y+3, (heat.value/heat.maxHeat)*(heat.width-20), heat.height-6);

	//add text
	heat.text = new createjs.Text("HEAT", gamejson.game.font._type, "#00FF00");
	heat.text.y = 10;
	heat.text.x = heat.x+heat.width/2-heat.text.getMeasuredWidth()/2;

	//stage.addChild(credits.bg.bmp);
	//init numbers to 0

	stage.addChild(heat.bg, heat.bar, heat.text);
	heat.text.visible = false;

	
}

function setHeat()
{
	scenes[currScene].stage.removeChild(heat.bar, heat.text);
	heat.bar = null;
	heat.bar = new createjs.Shape();
	heat.bar.graphics.beginLinearGradientFill(["#F66","#FAA","#F66","D00"], [0,0.3,0.6, 1], 0, 0, 0, heat.height-6).drawRect(heat.x + 10, heat.y+3, (heat.value/heat.maxHeat)*(heat.width-20), heat.height-6);
	heat.text.text = "HEAT";
	heat.text.visible = true;
	heat.bar.visible = true;
	heat.bg.visible = true;
	scenes[currScene].stage.addChild(heat.bar, heat.text);
}


function armHeat()
{
	heat.state = 0;
	heat.armed = true;
	heat.maxTime = (heat.maxHeat-heat.value);
	heat.time = 0;
	heat.risk = 0;
	heat.maxRisk = (currentJob.risk-1)*heat.maxTime/5;
	heat.riskOffset = 0;
	heat.noRiskTime = (6 - currentJob.risk)*heat.maxTime/5;
	heat.bar.visible =false;
	scenes[currScene].stage.removeChild(heat.bar, heat.text,heat.modules);
	//create bar
	heat.bar = null;
	heat.bar = new createjs.Shape();
	heat.bar.graphics.beginFill("darkblue").drawRect(heat.x + 10 + ((heat.value + heat.maxTime-heat.time) /heat.maxHeat)*(heat.width-20), heat.y+3, 
														(heat.time/heat.maxHeat)*(heat.width-20), heat.height-6);
	//create text
	heat.text.text = "TIME";
	//create risk modules
	heat.modules = new createjs.Shape();
	heat.modules.graphics.beginFill("grey").drawRect(heat.x + 10 + ((heat.value + heat.maxTime-heat.risk) /heat.maxHeat)*(heat.width-20), heat.y+3, 
														(heat.risk/heat.maxHeat)*(heat.width-20), heat.height-6);
	heat.text.visible = true;
	heat.bar.visible = true;
	heat.bg.visible = true;
	scenes[currScene].stage.addChild(heat.bar, heat.modules, heat.text);
}

function hideHeat()
{
	heat.armed = false;
	heat.text.visible = false;
	heat.bar.visible = false;
	heat.bg.visible = false;
}

function addCreditsToStage(stage)
{

	stage.addChild(credits.bg.bmp);
	//init numbers to 0
	var numbersGrid = new Array(8);
	for(var i = 0 ; i < numbersGrid.length ; i++)
	{
		var numberObj = new Object();
		
		if(i == 0)
		{
			numberObj.bmp = credits.subelements[10].bmp.clone();
		}
		//comma
		else if(i == 4)
		{
			numberObj.bmp = credits.subelements[11].bmp.clone();
		}
		else
		//rest
		{
			numberObj.bmp = credits.subelements[0].bmp.clone();
		}
			
		numbersGrid[i] = numberObj;

		numberObj.bmp.x = 9 + i*20;
		numberObj.bmp.y = 7;
		stage.addChild(numberObj.bmp);
	}
	credits.numbers = numbersGrid;
}


function setCredits()
{
	var digits = new Array();
	//determine particular values for digits
	for(var i = 5; i >= 0 ; i --)
	{
		digits.push(Math.floor((credits.value%Math.pow(10,(i+1)))/Math.pow(10,i)));
	}
	
	//compare and change digits
	for(var i = 0; i < 6 ; i ++)
	{
		var index = i+1;
		if(index>3) index++;
		scenes[currScene].stage.removeChild(credits.numbers[index].bmp);

		var x = credits.numbers[index].bmp.x;
		var y = credits.numbers[index].bmp.y;
		credits.numbers[index].bmp = credits.subelements[digits[i]].bmp.clone();
		credits.numbers[index].bmp.x = x;
		credits.numbers[index].bmp.y = y;
		scenes[currScene].stage.addChild(credits.numbers[index].bmp);
	}
}

function changeText(text, messageObj)
{
	messageObj.text.text = text;
	if(messageObj.text.getMeasuredWidth() < messageObj.lineWidth)
	{
		messageObj.text.lineWidth = messageObj.text.getMeasuredWidth();
	}

	var centeredX;
	if(messageObj.center_x)
	{
		centeredX = 800/2 - messageObj.text.lineWidth/2;
		messageObj.text.x = centeredX;
	}
	messageObj.bg = null;
	messageObj.bg = new createjs.Shape();
	adjustTextBox(messageObj.text , messageObj.bg);
	messageObj.bg.alpha = 0.5;
}

function adjustTextBox(textObj, textBox)
{
	textBox.graphics.beginFill("#111111").drawRoundRect(textObj.x - 20,
													textObj.y - 30,
													textObj.lineWidth + 40,
													textObj.getMeasuredHeight() + 30,
													10);
}
