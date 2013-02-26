
var jobsScene = (function() {
	//var input;
	var scene;

	//job card
	var currentJobId;
	var card;
	var cats = new Array();

	return {
		init: function(scene) {
			console.log("init: jobScene");

			this.scene = scene;

			currentJobId = 0; // -1 for not selected ?

			//make sure all the assets are visible
			for(var i = 0 ; i < scene.visuals.length ; i++)
			{
				scene.scene.visuals[i].visible = true;
			}

			// Setup the game stage
			card = this.scene.visuals[3];
			card.bitmap.x = 40;
			card.bitmap.y = 300;
			card.bitmap.regX += 0;
			card.bitmap.regY += 0;
			setupCard(card, currentJobs[currentJobId]);
			currentJob = currentJobs[currentJobId]

			// add a handler for all the events we're interested in
			//this.scene.stage.onTick = update;
			document.onkeydown = handleKeyDown;

			//define mouse callback
			//handle mouse events
			this.scene.stage.onMouseMove = function(mousePos) {
				for(var i = 0 ; i < scene.visuals.length ; i++)
				{
					if(scene.visuals[i].hasHover)
					{
						if(scene.visuals[i].bitmap.hitTest( mousePos.stageX , mousePos.stageY ))
						{
							//console.log("hover state initialized");
						}
					}
				}
			}

			this.scene.stage.onMouseDown = function(mousePos) {
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

			//update scene
			this.scene.stage.update();
		},
		finalize: function() {
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
				scenes[currScene].stage.removeChild(cats[j]);
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

})();