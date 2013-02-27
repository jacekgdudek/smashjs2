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
	}
	events = [];
}

function addCredits(_credits)
{
	credits.nextValue += _credits;
	console.log("Credits : " + credits.nextValue);
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