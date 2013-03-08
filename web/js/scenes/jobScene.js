function JobScene(){
	this.cardState = 0;
	//0 - hidden
	//1 - sliding up
	//2 - up
	//3 - sliding down
	this.nextCardJob = new Object();
	this.cats = new Array();

	//jobpointers
	this.jobPointers = new Array();

	/*
	//var input;
	var scene;

	//job card
	var currentJobId;
	var card; */
}
JobScene.prototype = new Scene(jobSceneStructure);

JobScene.prototype.init = function() {
	Scene.prototype.init.call(this);
	console.log("init: jobScene");

	setGUI();

	currentJobId = -1; // -1 for not selected ?
	this.nextCardJob.id = -1;

	//make sure all the assets are visible
	visuals = this.structure.visuals;
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
	//setupCard(card, currentJobs[currentJobId]);
	//currentJob = currentJobs[currentJobId];

	//------setup pointers
	for(var i = 0 ; i < currentJobs.length ; i++)
	{
		if (typeof currentJobs[i].conditions === 'undefined' || currentJobs[i].conditions.length == 0) {
			if (typeof currentJobs[i].finnished === 'undefined' || currentJobs[i].finnished == false) {
				var jobPointer = new Object();
				jobPointer = currentJobs[i];
				this.jobPointers.push(jobPointer);
			}
		}
	}
	randomizePositions(this.jobPointers, this.structure.jobPointerSrc, this.structure.jobPointerRect);



	// add a handler for all the events we're interested in
	//this.stage.onTick = update;
	document.onkeydown = this.handleKeyDown;

	//define mouse callback
	//handle mouse events
	this.stage.onMouseMove = function(mousePos) {
		this.nextCardJob.id = -1;
		// hover over pointers
		for(var i = 0 ; i < this.jobPointers.length ; i++)
		{
			if(this.jobPointers[i].pointer.hitTest( mousePos.stageX - this.jobPointers[i].pointer.x , mousePos.stageY - this.jobPointers[i].pointer.y ))
			{
				this.nextCardJob = this.jobPointers[i];
				this.nextCardJob.id = i;
			}
		}
	}

	this.stage.onMouseDown = function(mousePos) {
		// mouse down on pointers
		for(var i = 0 ; i < this.jobPointers.length ; i++)
		{
			if(this.jobPointers[i].pointer.hitTest( mousePos.stageX - this.jobPointers[i].pointer.x , mousePos.stageY - this.jobPointers[i].pointer.y ))
			{
				addEvent("SWITCH_SCENE", this.jobPointers[i].type);
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

JobScene.prototype.update = function() {
	//--------animate card
	//if next card is ready
	if(this.nextCardJob.id != -1 && this.nextCardJob.id != currentJobId && this.cardState != 3)
	{
		switch(this.cardState)
		{
			//hidden
			case 0:
				currentJobId = this.nextCardJob.id;
				setupCard(card, this.nextCardJob);
				currentJob = this.jobPointers[currentJobId];
				this.nextCardJob.id = -1;
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
	else if (this.nextCardJob.id == -1)	
	{
		if(this.cardState != 0)
		{
			this.cardState = 3;
		}
	}
	else if (this.nextCardJob.id == currentJobId)	
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
			currentJobId = this.nextCardJob.id;
			setupCard(card, this.nextCardJob);
			currentJob = this.jobPointers[currentJobId];
			this.nextCardJob.id = -1;
			this.cardState = 1;
		}
		
	}

	animateCard(card);

	//update scene
	this.stage.update();
}

JobScene.prototype.finalize = function() {
	Scene.prototype.finalize.call(this);
	for(var i = 0 ; i < this.jobPointers.length ; i++)
	{
		this.stage.removeChild(this.jobPointers[i].pointer);
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
	this.jobPointers = new Array();
	hideGUI();
	hideCard(card);
}

JobScene.prototype.handleKeyDown = function(evt) {
	// For now we use keyboard controls for the dial
	if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
	if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }
};

JobScene.prototype.setupCard = function(card, job) {
	if (typeof card.this.cats !== 'undefined') {
		for(var j = 0 ; j < card.this.cats.length ; j ++)
		{
			scenes[currScene].stage.removeChild(card.this.cats[j]);
		}
	}

	var textLines = new Array();
	for(var i = 0 ; i < 3 ; i++)
	{
		//setup texts
		var text;

		switch(i)
		{
			case 0:
				text = new createjs.Text("Location : " + job.name, "20px Arial", "#ff7700");
			break;
			case 1:
				text = new createjs.Text("Reward : ", "20px Arial", "#ff7700");
				for(var j = 0 ; j < job.reward ; j ++)
				{
					cat = new createjs.Bitmap(scenes[currScene].catSrc);
					cat.x = 40 + text.getMeasuredWidth() + j*25;
					cat.y = card.bitmap.y + 30 + i*60;
					this.cats.push(cat);
					scenes[currScene].stage.addChild(cat);
				}
			break;
			case 2:
				text = new createjs.Text("Risk : ", "20px Arial", "#ff7700");
				//display difficulty
				for(var j = 0 ; j < job.risk ; j ++)
				{
					cat = new createjs.Bitmap(scenes[currScene].catSrc);
					cat.x = 40 + text.getMeasuredWidth() + j*25;
					cat.y = card.bitmap.y + 30 + i*60;
					this.cats.push(cat);
					scenes[currScene].stage.addChild(cat);
				}
			break;
		}

		text.y = card.bitmap.y + 40 + i*60;
		text.x = 40;
		text.textBaseline = "alphabetic";

		scenes[currScene].stage.addChild(text);
		textLines.push(text);
	}
	card.textLines = textLines;
	card.cats = this.cats;
}

JobScene.prototype.hideCard = function(card) {
	if (typeof card.this.cats !== 'undefined') {
		for(var j = 0 ; j < card.this.cats.length ; j ++)
		{
			scenes[currScene].stage.removeChild(card.cats[j]);
		}
	}
	if (typeof card.textLines !== 'undefined') {
		for(var i = 0 ; i < card.textLines.length ; i++)
		{
			scenes[currScene].stage.removeChild(card.textLines[i]);
		}
	}

}

JobScene.prototype.randomizePositions = function(jobs, pointerSrc, rect)
{
	for(var i = 0 ; i < jobs.length ; i ++)
	{
		var randX = rect.x + Math.floor(Math.random()*rect.width);
		var randY = rect.y + Math.floor(Math.random()*rect.height);

		jobs[i].pointer = new createjs.Bitmap(pointerSrc);
		jobs[i].pointer.x = randX;
		jobs[i].pointer.y = randY;

		scenes[currScene].stage.addChild(jobs[i].pointer);
	}
}

JobScene.prototype.animateCard(card) {
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
