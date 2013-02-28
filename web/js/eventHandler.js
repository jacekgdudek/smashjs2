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
	events[events.length] = event;
}

function handleEvents()
{
	
	//custom events
	while( events.length != 0 )
	{
		var event = events.shift()
		if(event.type == "SWITCH_SCENE") switchStage(event.content);

		else if(event.type == "SWITCH_SUB_STAGE") switchSubStage(event.content2);

		else if(event.type == "COLLISION") processCollision(event);

		else if(event.type == "ADD_CREDITS") addCredits(event.content);

		else if(event.type == "ADD_HEAT") addHeat(event.content);

		else if(event.type == "FINNISHED_JOB") finnishedJob(event.content);

		else if(event.type == "CHANGE_CITY") changeCity(event.content);

		else if(event.type == "DECREASE_GLOBAL_HEAT") decreaseGlobalHeat();

	}
	events = [];
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
		currCity = _city;
	}
	heat.nextValue = cities[currCity].currHeat;
	addEvent("SWITCH_SCENE","base_scene");
}

function finnishedJob(success)
{
	if(success)
	{
		addEvent("ADD_HEAT", currentJob.risk*10);
		addEvent("SWITCH_SCENE", "reward_scene");
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

function addCredits(_credits)
{
	if(_credits == "-3/4") credits.nextValue = credits.nextValue/4;
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

function switchStage(content)
{
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