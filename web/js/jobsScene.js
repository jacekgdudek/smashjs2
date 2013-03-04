
//---------------cardState
	var cardState = 0;
	//0 - hidden
	//1 - sliding up
	//2 - up
	//3 - sliding down
var jobsScene = (function() {
	//var input;
	var scene;

	//job card
	var currentJobId;
	var card;
	var nextCardJob = new Object();
	var cats = new Array();
	

	//jobpointers
	var jobPointers = new Array();

	return {
		init: function(scene) {
			console.log("init: jobScene");

			this.scene = scene;
			setGUI();

			currentJobId = -1; // -1 for not selected ?
			nextCardJob.id = -1;

			//make sure all the assets are visible
			for(var i = 0 ; i < scene.visuals.length ; i++)
			{
				scene.scene.visuals[i].visible = true;
			}

			//----------------- Setup the game stage
			//setup card
			card = this.scene.visuals[3];
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
						jobPointers.push(jobPointer);
					}
				}
			}
			randomizePositions(jobPointers, scene.jobPointerSrc, scene.jobPointerRect);



			// add a handler for all the events we're interested in
			//this.scene.stage.onTick = update;
			document.onkeydown = handleKeyDown;

			//define mouse callback
			//handle mouse events
			this.scene.stage.onMouseMove = function(mousePos) {
				nextCardJob.id = -1;
				// hover over pointers
				for(var i = 0 ; i < jobPointers.length ; i++)
				{
					if(jobPointers[i].pointer.hitTest( mousePos.stageX - jobPointers[i].pointer.x , mousePos.stageY - jobPointers[i].pointer.y ))
					{
						nextCardJob = jobPointers[i];
						nextCardJob.id = i;
					}
				}
			}

			this.scene.stage.onMouseDown = function(mousePos) {
				// mouse down on pointers
				for(var i = 0 ; i < jobPointers.length ; i++)
				{
					if(jobPointers[i].pointer.hitTest( mousePos.stageX - jobPointers[i].pointer.x , mousePos.stageY - jobPointers[i].pointer.y ))
					{
						addEvent("SWITCH_SCENE", jobPointers[i].type);
					}
				}

				if(scene._name == currScene)
				{
					for(var i = 0 ; i < scene.visuals.length ; i++)
					{
						if(scene.visuals[i].hasDown)
						{
							if(scene.visuals[i].bitmap.hitTest( mousePos.stageX - scene.visuals[i].bitmap.x , mousePos.stageY - scene.visuals[i].bitmap.y ))
							{
								addEventEx(scene.visuals[i].downEvent);
								console.log("down state initialized");
							}
						}
					}
				}
			}

		},
		update: function() {
			//--------animate card
			//if next card is ready
			if(nextCardJob.id != -1 && nextCardJob.id != currentJobId && cardState != 3)
			{
				switch(cardState)
				{
					//hidden
					case 0:
						currentJobId = nextCardJob.id;
						setupCard(card, nextCardJob);
						currentJob = jobPointers[currentJobId];
						nextCardJob.id = -1;
						cardState = 1;
					break;
					// sliding upwards
					case 1:
						cardState = 3;
					break;
					// up
					case 2:
						cardState = 3;
					break;
					// sliding donwards
					case 3:
					break;
				}
			}
			else if (nextCardJob.id == -1)	
			{
				if(cardState != 0)
				{
					cardState = 3;
				}
			}
			else if (nextCardJob.id == currentJobId)	
			{
				if(cardState != 2)
				{
					cardState = 1;
				}
			}
			else if( cardState == 3)
			{
				if(card.bitmap.y > 550)
				{
					currentJobId = nextCardJob.id;
					setupCard(card, nextCardJob);
					currentJob = jobPointers[currentJobId];
					nextCardJob.id = -1;
					cardState = 1;
				}
				
			}

			animateCard(card);

			//update scene
			this.scene.stage.update();
		},
		finalize: function() {
			for(var i = 0 ; i < jobPointers.length ; i++)
			{
				this.scene.stage.removeChild(jobPointers[i].pointer);
			}
			for(var i = 0 ; i < this.scene.visuals.length ; i++)
			{
				this.scene.visuals[i].visible = false;
			}
			if (typeof this.scene.messages !== 'undefined') {
				for(var i = 0 ; i < this.scene.messages.length ; i++)
				{
					this.scene.messages[i].bg.visible = false;
					this.scene.messages[i].text.visible = false;
				}
			}
			jobPointers = new Array();
			hideGUI();
			hideCard(card);
		},
	};

	function handleKeyDown(evt) {
		// For now we use keyboard controls for the dial
		if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
		if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }
	};

	function setupCard(card , job)
	{
		if (typeof card.cats !== 'undefined') {
			for(var j = 0 ; j < card.cats.length ; j ++)
			{
				scenes[currScene].stage.removeChild(card.cats[j]);
			}
		}

		var textLines = new Array();
		var cats = new Array()
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
						cats.push(cat);
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
						cats.push(cat);
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
		card.cats = cats;
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

	function randomizePositions(jobs, pointerSrc, rect)
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

	function animateCard(card)
	{
		switch (cardState)
		{
			//sliding up
			case 1:
				card.bitmap.y -= 20;
				if(card.bitmap.y < 600 - card.bitmap.image.height + 5)
				{
					cardState = 2;
				}
				//adjust textlines
				for(var i = 0 ; i < card.textLines.length ; i++)
				{
					card.textLines[i].y -= 20;
				}
				//adjust cats
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
					cardState = 0;
				}
				//adjust textlines
				for(var i = 0 ; i < card.textLines.length ; i++)
				{
					card.textLines[i].y += 30;
				}
				//adjust cats
				for(var i = 0 ; i < card.cats.length ; i++)
				{
					card.cats[i].y += 30;
				}
			break;
		}
	}

})();