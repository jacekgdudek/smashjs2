function CityScene(){

	this.cardState = 0;
	//0 - hidden
	//1 - sliding up
	//2 - up
	//3 - sliding down
	this.nextCardCity = new Object();
	this.cats = new Array();

	//jobpointers
	this.cityPointers = new Array();
}

CityScene.prototype = new Scene(citySceneStructure);

CityScene.prototype.init = function() {
	Scene.prototype.init.call(this);
	console.log("init: jobScene");

	setGUI();

	currentCityId = -1; // -1 for not selected ?
	this.nextCardCity.id = -1;

	//make sure all the assets are visible
	var visuals = this.structure.visuals;
	for(var i = 0 ; i < visuals.length ; i++)
	{
		visuals[i].visible = true;
	}

	//----------------- Setup the game stage
	//setup card
	card = visuals[3];
	card.bitmap.x = 40;
	card.bitmap.y = 601;
	card.bitmap.regX += 0;
	card.bitmap.regY += 0;
	//this.setupCard(card, currentJobs[currentJobId]);
	//currentJob = currentJobs[currentJobId];

	//------setup pointers
	for(var key in cities)
	{
		var cityPointer = new Object();
		cityPointer = cities[key];
		this.cityPointers.push(cityPointer);
	}
	this.setThumbnails(this.cityPointers);
	//toooo dooooo -------------------> link to areas

	// add a handler for all the events we're interested in
	//this.stage.onTick = update;
	document.onkeydown = this.handleKeyDown;

	//define mouse callback
	//handle mouse events
	this.stage.onMouseMove = function(mousePos) {
		this.nextCardCity.id = -1;
		// hover over pointers
		for(var i = 0 ; i < this.cityPointers.length ; i++)
		{
			if(this.cityPointers[i].pointer.hitTest( mousePos.stageX - this.cityPointers[i].pointer.x , mousePos.stageY - this.cityPointers[i].pointer.y ))
			{
				this.cityPointers[i].pointerHighlight.visible = true;
				this.nextCardCity = this.cityPointers[i];
				this.nextCardCity.id = i;
			}
			else
			{
				this.cityPointers[i].pointerHighlight.visible = false;
			}
		}
	}

	this.stage.onMouseDown = function(mousePos) {
		// mouse down on pointers
		for(var i = 0 ; i < this.cityPointers.length ; i++)
		{
			if(this.cityPointers[i].pointer.hitTest( mousePos.stageX - this.cityPointers[i].pointer.x , mousePos.stageY - this.cityPointers[i].pointer.y ))
			{
				addEvent("CHANGE_CITY", this.cityPointers[i].name);
			}
		}

		for(var i = 0 ; i < visuals.length ; i++)
		{
			if(visuals[i].hasDown)
			{
				if(visuals[i].bitmap.hitTest( mousePos.stageX - visuals[i].bitmap.x , mousePos.stageY - visuals[i].bitmap.y ))
				{
					addEventEx(visuals[i].downEvent);
					console.log("down state initialized");
				}
			}
		}
	}
}
CityScene.prototype.update = function() {
	//--------animate card
	//if next card is ready
	if(this.nextCardCity.id != -1 && this.nextCardCity.id != currentCityId && this.cardState != 3)
	{
		switch(this.cardState)
		{
			//hidden
			case 0:
				currentCityId = this.nextCardCity.id;
				setupCard(card, this.nextCardCity);
				currentCity = this.cityPointers[currentCityId].name;
				this.nextCardCity.id = -1;
				this.cardState = 1;
			break;
			// sliding upwards
			case 1:
				this.cardState = 3;
			break;
			// up
			case 2:
				this.cardState = 3;
			break;
			// sliding donwards
			case 3:
			break;
		}
	}
	else if (this.nextCardCity.id == -1)	
	{
		if(this.cardState != 0)
		{
			this.cardState = 3;
		}
	}
	else if (this.nextCardCity.id == currentCityId)	
	{
		if(this.cardState != 2)
		{
			this.cardState = 1;
		}
	}
	else if( this.cardState == 3)
	{
		if(card.bitmap.y > 600)
		{
			currentCityId = this.nextCardCity.id;
			setupCard(card, this.nextCardCity);
			currentCity = this.cityPointers[currentCityId].name;
			nextCardJob.id = -1;
			this.cardState = 1;
		}
		
	}

	this.animateCard(card);

	//update scene
	this.stage.update();
}

CityScene.prototype.finalize = function() {
	Scene.prototype.finalize.call(this);
	hideCard(card);
	for(var i = 0 ; i < this.cityPointers.length ; i++)
	{
		this.stage.removeChild(this.cityPointers[i].pointer, this.cityPointers[i].pointerHighlight);
	}
	for(var i = 0 ; i < this.structure.visuals.length ; i++)
	{
		this.structure.visuals[i].visible = false;
	}
	if (typeof this.structure.messages !== 'undefined') {
		for(var i = 0 ; i < this.structure.messages.length ; i++)
		{
			this.structure.messages[i].bg.visible = false;
			this.structure.messages[i].text.visible = false;
		}
	}
	this.cityPointers = new Array();
	hideGUI();
};

CityScene.prototype.handleKeyDown = function(evt) {
	// For now we use keyboard controls for the dial
	if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
	if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }
};

CityScene.prototype.setupCard = function(card, city) {
	if (typeof card.cats !== 'undefined') {
		for(var j = 0 ; j < card.cats.length ; j ++)
		{
			scenes[currScene].stage.removeChild(card.cats[j]);
		}
	}

	var textLines = new Array();
	for(var i = 0 ; i < 4 ; i++)
	{
		//setup texts
		var text;

		switch(i)
		{
			case 0:
				text = new createjs.Text("Location : " + city.name, "20px Arial", "#ff7700");
			break;
			case 1:
				text = new createjs.Text("Reward : ", "20px Arial", "#ff7700");
				for(var j = 0 ; j < city.reward ; j ++)
				{
					cat = new createjs.Bitmap(scenes[currScene].catSrc);
					cat.x = 40 + text.getMeasuredWidth() + j*25;
					cat.y = card.bitmap.y + 30 + i*40;
					this.cats.push(cat);
					scenes[currScene].stage.addChild(cat);
				}
			break;
			case 2:
				text = new createjs.Text("Heat : ", "20px Arial", "#ff7700");
				//display difficulty
				for(var j = 0 ; j < Math.floor((city.currHeat*5)/city.maxHeat)+1 ; j ++)
				{
					cat = new createjs.Bitmap(scenes[currScene].catSrc);
					cat.x = 40 + text.getMeasuredWidth() + j*25;
					cat.y = card.bitmap.y + 30 + i*40;
					this.cats.push(cat);
					scenes[currScene].stage.addChild(cat);
				}
			break;
			case 3:
				text = new createjs.Text("Info : "+ city.info, "20px Arial", "#ff7700");
			break;
		}

		text.y = card.bitmap.y + 40 + i*40;
		text.x = 40;
		text.textBaseline = "alphabetic";
		text.lineWidth = 280;

		scenes[currScene].stage.addChild(text);
		textLines.push(text);
	}
	card.textLines = textLines;
	card.cats = this.cats;
}

function hideCard(card)
{
	if (typeof card.cats !== 'undefined') {
		for(var j = 0 ; j < card.cats.length ; j ++)
		{
			scenes[currScene].stage.removeChild(card.cats[j]);
		}
	}
	for(var i = 0 ; i < card.textLines.length ; i++)
	{
		scenes[currScene].stage.removeChild(card.textLines[i]);
	}

}

function setThumbnails(cities)
{
	for(var i = 0 ; i < cities.length ; i ++)
	{
		cities[i].pointer = new createjs.Bitmap(cities[i].pointerSrc);
		cities[i].pointerHighlight = new createjs.Bitmap(cities[i].pointerHighlightsSrc);
		cities[i].pointerHighlight.visible = false;
		//change to 0
		cities[i].pointer.x = (i+1)*50;
		cities[i].pointer.y = (i+1)*50;
		cities[i].pointerHighlight.x = (i+1)*50;
		cities[i].pointerHighlight.y = (i+1)*50;

		scenes[currScene].stage.addChild(cities[i].pointer, cities[i].pointerHighlight);
	}
}

function animateCard(card)
{
	switch (this.cardState)
	{
		//sliding up
		case 1:
			card.bitmap.y -= 20;
			if(card.bitmap.y < 600 - card.bitmap.image.height + 20)
			{
				this.cardState = 2;
			}
			//adjust textlines
			for(var i = 0 ; i < card.textLines.length ; i++)
			{
				card.textLines[i].y -= 20;
			}
			//adjust this.cats
			for(var i = 0 ; i < card.cats.length ; i++)
			{
				card.cats[i].y -= 20;
			}
		break;
		//sliding down
		case 3:
			card.bitmap.y += 30;
			if(card.bitmap.y > 600)
			{
				this.cardState = 0;
			}
			//adjust textlines
			for(var i = 0 ; i < card.textLines.length ; i++)
			{
				card.textLines[i].y += 30;
			}
			//adjust this.cats
			for(var i = 0 ; i < card.cats.length ; i++)
			{
				card.cats[i].y += 30;
			}
		break;
	}
}
