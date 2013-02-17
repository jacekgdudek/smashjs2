var combinationScene = (function() {
	var listOfTargets, targetPointer, lastTargetPointer,spin;
	var input;
	var scene;

	return {
		init: function(scene) {
			console.log("init: combinationScene");

			this.scene = scene;
			// Setup the game stage
			//rotatingDial = new createjs.Bitmap("../media/visuals/safe/dial.png");
			rotatingDial = this.scene.visuals[0];
			rotatingDial.bitmap.x = 0;//900+139;
			rotatingDial.bitmap.y = 0;//200+139;
			rotatingDial.bitmap.regX += 0;//139;
			rotatingDial.bitmap.regY += 0;//139;

			//rotatingIndicator = new createjs.Bitmap("../media/visuals/safe/indicator.png");
			rotatingIndicator = this.scene.visuals[1];			
			rotatingIndicator.bitmap.x = 0;//900+139;
			rotatingIndicator.bitmap.y = 0;//200+139;
			rotatingIndicator.bitmap.regX += 0;//139;
			rotatingIndicator.bitmap.regY += 0;//139;

			//knob = new createjs.Bitmap("../media/visuals/safe/knob.png");
			knob = this.scene.visuals[2];
			knob.bitmap.x = 0;//900;
			knob.bitmap.y = 0;//200;

			//this.scene.stage.addChild(rotatingDial);
			//this.scene.stage.addChild(rotatingIndicator);
			//this.scene.stage.addChild(knob);

			// Setup the input "wheel" that can be controlled
			this.input = new Object();
			this.input.rotation = 0;

			// Create a list of random targets e.g. 53, -124, 200, 5, etc
			this.listOfTargets = new Array();

			// Start with a random direction
			var randomBoolean = !! Math.round(Math.random() * 1);
			var direction = 1;
			if (randomBoolean) {
				direction *= -1;	
			}

			// create the targets
			numberOfTargets = 3;
			for (var i = 0; i < numberOfTargets; i++) {
				// At a random point
				this.listOfTargets.push(direction*Math.floor(Math.random() * 360));
				// Change direction each time
				direction *= -1;
			}

			this.targetPointer = 0;
			this.lastTargetPointer = 0;
			this.spin=0;

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
							console.log("hover state initialized");
						}
					}
				}
			}
			//createjs.Ticker.addListener(this.scene.stage);
			// Handle resettng the audio so it can be played again
			/*
			buzzAudio.click.bind("ended", function() {
				buzzAudio.click.load();
				buzzAudio.click.setTime(0);
			});			
			buzzAudio.failure.bind("ended", function() {
				buzzAudio.failure.load();
				buzzAudio.failure.setTime(0);
			});			
			buzzAudio.tumbler.bind("ended", function() {
				buzzAudio.tumbler.load();
				buzzAudio.tumbler.setTime(0);
			});*/
		},
		update: function() {
			this.input.rotation = inputArray[2].rotation;
			// Keep this.input rotation within bounds
			if (this.input.rotation > 360) { this.input.rotation = 360; }
			if (this.input.rotation <= -360) { this.input.rotation = -360; }

			// Make the dial spin if we win the game
			var spinSpeed = 9;
			var spinDuration = 400;
			rotatingDial.bitmap.rotation = this.input.rotation;

			if (this.spin < spinDuration) {
				// Otherwise use it to show progress (i.e. the value of targetPointer)
				rotatingIndicator.bitmap.rotation = 90*this.targetPointer+(this.spin*spinSpeed);
			}

			// If we hit the target move on to the next one
			var currentTarget = this.listOfTargets[this.targetPointer];
			//console.log("Rotation: %s", input.rotation);
			if (	(currentTarget >= 0 && this.input.rotation > currentTarget) ||
				(currentTarget <  0 && this.input.rotation < currentTarget)) {
					this.lastTargetPointer = this.targetPointer;
					this.targetPointer++;
					//buzzAudio.tumbler.play();
			}
			// Reset if we went to far
			var lastTarget = this.listOfTargets[this.lastTargetPointer];
			var failDistance = 20;
			if (	this.lastTargetPointer > 0 &&	
				((lastTarget >= 0 && this.input.rotation > lastTarget+failDistance) ||
				(lastTarget < 0 && this.input.rotation < lastTarget-failDistance))) {
					this.lastTargetPointer = 0;
					this.targetPointer = 0;
					//buzzAudio.failure.play();
			}
			// Check if we have finished
			if (this.targetPointer >= this.listOfTargets.length) {
				console.log("Combination Found!");
				// Aww yeah!
				this.spin++;
			}

			//update scene
			this.scene.stage.update();
		},

	};
	function handleKeyDown(evt) {
		// For now we use keyboard controls for the dial
		if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
		if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }

		/*
		if (	((evt.keyIdentifier=="Left") || (evt.keyIdentifier=="Right")) &&    
		      	buzzAudio.click.getTime()==0) {
			// Play the sound if we pressed the button and it's not playing
			buzzAudio.click.play();
		}*/
		scene.stage.update();
	};

})();