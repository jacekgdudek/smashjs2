 //////////////////////////////////////
 //
 //         define listener
 var listener = document.getElementById('listener');

 var events = [];

function addEvent(type , content, content2 , extras, extras2)// string , string , int, string
{
	var event = new Object();
	event.type = type;
	event.content = content;
	event.content2 = content2;
	event.extras = extras;
	events.push( event );
}

//collision mostly
function addEventEx(event)
{
	events.push( event );
}

function handleEvents()
{
	
	//custom events
	while( events.length != 0 )
	{
		var event = events.shift()
		if(event.type == "SWITCH_SCENE") switchStage(event.content, event.content2);

		else if(event.type == "SWITCH_SUB_STAGE") switchSubStage(event.content2);

		else if(event.type == "COLLISION") processCollision(event);

		else if(event.type == "SPECIAL_REWARD_BUTTON_DOWN") specialRewardDown(event.content, event.content2);

		else if(event.type == "GALLERY_SET_CURRENT") scenes[currScene].setImageId(event.content);
		
		else if(event.type == "GALLERY_NEXT") galleryNext();
		
		else if(event.type == "GALLERY_PREVIOUS") galleryPrevious();

		else if(event.type == "ADD_CREDITS") addCredits(event.content);

		else if(event.type == "ADD_HEAT") addHeat(event.content);

		else if(event.type == "FINNISHED_JOB") finnishedJob(event.content);

		else if(event.type == "CHANGE_CITY") changeCity(event.content);

		else if(event.type == "DECREASE_GLOBAL_HEAT") decreaseGlobalHeat();

		else if(event.type == "RANDOMIZE_JOBS") randomizeJobs();

		else if(event.type == "SAVE_GAME") saveData();

		else if(event.type == "LOAD_GAME") loadData();

		else if(event.type == "OPEN_PREVIEW") openPreview();

		else if(event.type == "POP_UP_MESSAGE") setMessage(event.content, event.content2);

		else if(event.type == "SETTINGS_FLIP_X") flipX = !flipX;

		//------------------------------ start game
		else if(event.type == "START_NEW_GAME") startNewGame();

		else if(event.type == "CONTINUE_GAME") continueGame();

		

	}
	events = [];
}

function openPreview()
{
	addEvent("SWITCH_SCENE","preview_scene");
}

function specialRewardDown(id, imageId)
{
	console.log("switched to gallery scene");
	if(currScene == "reward_scene")
	{
		currSpecialRewards.push(id);
	}
	else if (currScene == "gallery_scene")
	{
		addEvent("SWITCH_SCENE", "gallery_zoom_scene");
		addEvent("GALLERY_SET_CURRENT", imageId);
	}
}

function galleryNext(){
	console.log("next image");
	scenes[currScene].nextImage();
}

function galleryPrevious(){
	console.log("previous image");
	scenes[currScene].previousImage();
}

function startNewGame()
{
	addEvent("SWITCH_SCENE","tutorial_scene",1);
	saveFlipX();
}

function continueGame()
{
	saveFlipX();
	addEvent("SWITCH_SCENE","base_scene");
	addEvent("LOAD_GAME");
}

function randomizeJobs()
{
	//clear previous jobs
	currentJobs = new Array();

	//randomize 1-3 levels
	for(var i = 0 ; i < 3 ; i++)
	{
		var newJob = new Object();

		var randName = jobs.names[Math.floor(Math.random()*jobs.names.length)].name;
		var randType = jobs.types[Math.floor(Math.random()*jobs.types.length)].name;
		var randRisk = Math.floor(Math.random()*2)+1;
		var randReward = Math.floor(Math.random()*2)+1;

		newJob.index = i;
		newJob.name = randName;
		newJob.risk = randRisk;
		newJob.reward = randReward;
		newJob.type = randType;

		currentJobs.push(newJob);
	}
	//

	//randomize levels 4-5
	for(var i = 0 ; i < 2 ; i++)
	{
		var newJob = new Object();

		var randName = jobs.names[Math.floor(Math.random()*jobs.names.length)].name;
		var randType = jobs.types[Math.floor(Math.random()*jobs.types.length)].name;
		var randRisk = Math.floor(Math.random()*3)+2;
		var randReward = Math.floor(Math.random()*3)+2;

		//prepare conditions
		var conditions = new Array();
		var randNoOfCond = Math.floor(Math.random()*2)+1;
		for(var j = 0 ; j < randNoOfCond ; j++)
		{
			var failed = true;
			var condition = new Object();
			while(failed)
			{
				failed = false;
				condition.value = Math.floor(Math.random()*3);
				for(var k = 0 ; k < conditions.length ; k++)
				{
					if(conditions[k] == condition.value)
					{
						failed = true;
					}
				}
			}
			conditions.push(condition)
		}

		newJob.index = i+3;
		newJob.name = randName;
		newJob.risk = randRisk;
		newJob.reward = randReward;
		newJob.type = randType;
		newJob.conditions = conditions;

		currentJobs.push(newJob);
	}

	//add 6th job
	var newJob = new Object();

	var randName = jobs.names[Math.floor(Math.random()*jobs.names.length)].name;
	var randType = jobs.types[Math.floor(Math.random()*jobs.types.length)].name;
	var randRisk = Math.floor(Math.random()*3)+3;
	var randReward = Math.floor(Math.random()*3)+3;

	//prepare conditions
	var conditions = new Array();
	var randNoOfCond = Math.floor(Math.random()*3)+1;
	for(var j = 0 ; j < randNoOfCond ; j++)
	{
		var failed = true;
		var condition = new Object();
		while(failed)
		{
			failed = false;
			condition.value = Math.floor(Math.random()*5);
			for(var k = 0 ; k < conditions.length ; k++)
			{
				if(conditions[k] == condition.value)
				{
					failed = true;
				}
			}
		}
		conditions.push(condition)
	}

	newJob.index = 6;
	newJob.name = randName;
	newJob.risk = randRisk;
	newJob.reward = randReward;
	newJob.type = randType;
	newJob.conditions = conditions;

	currentJobs.push(newJob);
}

function decreaseGlobalHeat()
{
	for(var key in cities)
	{
		if(key != currCity)
		{
			cities[key].currHeat -= 10;
			if(cities[key].currHeat < 0) cities[key].currHeat = 0;
		}
	}
}

function changeCity(_city)
{
	//save heat level
	cities[currCity].currHeat = heat.nextValue;
	//set new city
	if(_city == "random99")
	{
		var finnished = false;
		var limit = 300;
		var length = 0;
		//get citeis length
		for(var key in cities)
		{
			length++;
		}
		while(!finnished)
		{
			limit--;
			var rand = Math.floor(Math.random()*length);
			var i = 0;
			for(var key in cities)
			{
				if(i == rand && key != currCity)
				{
					currCity = key;
					finnished = true;
					break;
				}
				i++;
			}
			if(limit < 0) finnished = true;
		}
	}
	else
	{
		//check if enough funds to move
		if(credits.nextValue > cities[_city].travelCost)
		{
			currCity = _city;
			credits.nextValue -= cities[_city].travelCost;
		}
		else
		{
			//display global message that not enough cash
			setMessage("Not enough cash to move !", 100);
			console.log("Not enough cash to move!");
			return;
		}
		
	}
	heat.nextValue = cities[currCity].currHeat;
	addEvent("SWITCH_SCENE","base_scene");
	addEvent("RANDOMIZE_JOBS");
	addEvent("SAVE_GAME");
}

function finnishedJob(success)
{
	heat.armed = false;
	if(success)
	{
		currentJob.finnished = true;
		clearConditionsForJobs(currentJob.index);
		addEvent("SWITCH_SCENE", "reward_scene", 2);
		addEvent("DECREASE_GLOBAL_HEAT");
	}
	else
	{
		addEvent("ADD_HEAT", heat.maxHeat);
		addEvent("ADD_CREDITS", "-3/4");
		addEvent("CHANGE_CITY", "random99");
		//todo : what happens when job fail?
	}

}

function clearConditionsForJobs(id)
{
	for(var i = 0 ; i < currentJobs.length ; i ++)
	{
		if(typeof currentJobs[i].conditions !== 'undefined')
		{
			//var check = -1;
			//if(currentJobs[i].conditions.length == 1) check = 0;
			for(var j = 0 ; j < currentJobs[i].conditions.length ; j ++)
			{
				if(currentJobs[i].conditions[j].value == id)
				{
					//if(check == 0) check = 1;
					//delete currentJobs[i].conditions[j];
					currentJobs[i].conditions.splice(j,1);
				}
			}
			//if(check == 1) delete currentJobs[i].conditions;

		}
	}	
}

function addCredits(_credits)
{
	if(_credits == "-3/4") credits.nextValue = Math.floor(credits.nextValue/4);
	else
	{
		credits.nextValue += _credits;
	}
	console.log("Credits : " + credits.nextValue);
}

function addHeat(_heat)
{
	heat.nextValue += _heat;
	if(heat.nextValue > heat.maxHeat) heat.nextValue = heat.maxHeat;
	cities[currCity].currHeat += _heat;
}

function processCollision(event)
{
	//addEvent("COLLISION", scenes[currScene].collisions[i].event,  intersection , colliders[j],collidees[k]);
	addEventEx(event.content);
	console.log("Collision rect --> x:" + event.content2.x + " y:" + event.content2.y + " w:" + event.content2.width + " h:" + event.content2.height);
	//event.extras.collided();
	//event.extras2.collided();
}

function switchStage(content, content2)
{
	//trigger saving game
	if(content == "base_scene" && currScene == "reward_scene")
	{
		addEvent("ADD_HEAT", currentJob.risk*10);
		addEvent("SAVE_GAME");
	}


	if(currScene == content)
	{
		console.log("Switching to the same Scene... very smart");
		return;
	}

	if(typeof scenes[content] == 'undefined')
	{
		console.log("Error on switching stage to " + content);
	}
	else
	{
		//finalize old scene
		scenes[currScene].finalize();
		//swap currScene
		lastScene = currScene;
		currScene = content;
		//initialize new scene
		scenes[currScene].init(scenes[currScene]);
		console.log("Switched stage to " + content);

		//init transition if defined
		//if(typeof content2 !== 'undefined')
		//{
			transitionsManager.transition(scenes[lastScene], scenes[currScene],2);//content2);
		//}
		
	}
	
}

function switchSubStage(content)
{
	currStage.currentSubStage = content;
}
 //////////////////////////////////////
 //add event listeners
 listener.addEventListener('load', moduleDidLoad, true);
 listener.addEventListener('message', handleMessage, true);