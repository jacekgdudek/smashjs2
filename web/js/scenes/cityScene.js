
//---------------cardState
	var cardState = 0;
	//0 - hidden
	//1 - sliding up
	//2 - up
	//3 - sliding down
var cityScene = (function() {
	//var input;
	var scene;

	//city card
	var currentCityId;
	var card;
	var nextCardCity = new Object();
	var cats = new Array();
	

	//jobpointers
	var cityPointers = new Array();

	return {
		init: function(scene) {
			console.log("init: jobScene");

			this.scene = scene;
			setGUI();

			currentCityId = -1; // -1 for not selected ?
			nextCardCity.id = -1;

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
			for(var key in cities)
			{
				var cityPointer = new Object();
				cityPointer = cities[key];
				cityPointers.push(cityPointer);
			}
			setThumbnails(cityPointers);
			//toooo dooooo -------------------> link to areas

			// add a handler for all the events we're interested in
			//this.scene.stage.onTick = update;
			document.onkeydown = handleKeyDown;

			//define mouse callback
			//handle mouse events
			this.scene.stage.onMouseMove = function(mousePos) {
				nextCardCity.id = -1;
				// hover over pointers
				for(var i = 0 ; i < cityPointers.length ; i++)
				{
					if(cityPointers[i].pointer.hitTest( mousePos.stageX - cityPointers[i].pointer.x , mousePos.stageY - cityPointers[i].pointer.y ))
					{
						cityPointers[i].pointerHighlight.visible = true;
						nextCardCity = cityPointers[i];
						nextCardCity.id = i;
					}
					else
					{
						cityPointers[i].pointerHighlight.visible = false;
					}
				}
			}

			this.scene.stage.onMouseDown = function(mousePos) {
				// mouse down on pointers
				for(var i = 0 ; i < cityPointers.length ; i++)
				{
					if(cityPointers[i].pointer.hitTest( mousePos.stageX - cityPointers[i].pointer.x , mousePos.stageY - cityPointers[i].pointer.y ))
					{
						addEvent("CHANGE_CITY", cityPointers[i].name);
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
			if(nextCardCity.id != -1 && nextCardCity.id != currentCityId && cardState != 3)
			{
				switch(cardState)
				{
					//hidden
					case 0:
						currentCityId = nextCardCity.id;
						setupCard(card, nextCardCity);
						currentCity = cityPointers[currentCityId].name;
						nextCardCity.id = -1;
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
			else if (nextCardCity.id == -1)	
			{
				if(cardState != 0)
				{
					cardState = 3;
				}
			}
			else if (nextCardCity.id == currentCityId)	
			{
				if(cardState != 2)
				{
					cardState = 1;
				}
			}
			else if( cardState == 3)
			{
				if(card.bitmap.y > 600)
				{
					currentCityId = nextCardCity.id;
					setupCard(card, nextCardCity);
					currentCity = cityPointers[currentCityId].name;
					nextCardJob.id = -1;
					cardState = 1;
				}
				
			}

			animateCard(card);

			//update scene
			this.scene.stage.update();
		},
		finalize: function() {
			hideCard(card);
			for(var i = 0 ; i < cityPointers.length ; i++)
			{
				this.scene.stage.removeChild(cityPointers[i].pointer, cityPointers[i].pointerHighlight);
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
			cityPointers = new Array();
			hideGUI();
		},
	};

	function handleKeyDown(evt) {
		// For now we use keyboard controls for the dial
		if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
		if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }
	};

	function setupCard(card , city)
	{
		if (typeof card.cats !== 'undefined') {
			for(var j = 0 ; j < card.cats.length ; j ++)
			{
				scenes[currScene].stage.removeChild(card.cats[j]);
			}
		}

		var textLines = new Array();
		var cats = new Array()
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
						cats.push(cat);
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
						cats.push(cat);
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
		if (typeof card.textLines !== 'undefined') {
			for(var i = 0 ; i < card.textLines.length ; i++)
			{
				scenes[currScene].stage.removeChild(card.textLines[i]);
			}
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
		switch (cardState)
		{
			//sliding up
			case 1:
				card.bitmap.y -= 20;
				if(card.bitmap.y < 600 - card.bitmap.image.height + 20)
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