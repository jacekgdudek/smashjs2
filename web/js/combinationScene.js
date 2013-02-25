var combinationScene = (function() {

	var listOfTargets, targetPointer, lastTargetPointer , spin ,direction;

	var currentNumber, lastNumber;

	var scene;

	return {
		init: function(scene) {
			console.log("init: combinationScene");

			this.scene = scene;
			// Setup the game stage
			knob = this.scene.visuals[1];
			knob.bitmap.x = 800-knob.bitmap.image.width;//900+139;
			knob.bitmap.y = 20;//200+139;
			knob.bitmap.regX += 0;//139;
			knob.bitmap.regY += 0;//139;

			knobNumbers = this.scene.visuals[2];			
			knobNumbers.bitmap.x = knob.bitmap.x+115;//900+139;
			knobNumbers.bitmap.y = knob.bitmap.y+117;//200+139;
			knobNumbers.bitmap.regX += 115;//139;
			knobNumbers.bitmap.regY += 117;//139;

			stethoscope = this.scene.visuals[3];			
			stethoscope.bitmap.x = 0;//900+139;
			stethoscope.bitmap.y = 600;//200+139;

			// Create a list of random targets e.g. 53, -124, 200, 5, etc
			this.listOfTargets = new Array();

			// create the targets
			numberOfTargets = 1;
			for (var i = 0; i < numberOfTargets; i++) {
				// At a random point
				var number = Math.floor((knobNumbers.maxNumber/360)*Math.floor(Math.random() * 360));
				this.listOfTargets.push(number);
				console.log( "number : " + number);
			}

			this.lastNumber = 9999;
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

			this.scene.stage.onMouseDown = function(mousePos) {
				for(var i = 0 ; i < scene.visuals.length ; i++)
				{
					if(scene.visuals[i].hasDown)
					{
						if(scene.visuals[i].bitmap.hitTest( mousePos.stageX , mousePos.stageY ))
						{
							console.log("down state initialized");
						}
					}
				}
			}
		},
		update: function() {
			//-------update sthetoscope
			//scale up and flip as well
			stethoscope.bitmap.x = 800 - stethoscope.bitmap.image.width - (((800 - stethoscope.bitmap.image.width)/(640 - (2*100)))*(inputArray[0].x - 100));
			stethoscope.bitmap.y = (600/480)*inputArray[0].y;

			//----------------------------------- update dial
			var directionNow = false;
			var directionChanged = false;

			var rotation = inputArray[2].rotation;
			// Keep this.input rotation within bounds
			if (rotation > 360) { rotation = 360; }
			if (rotation <= -360) { rotation = -360; }

			knobNumbers.bitmap.rotation = rotation;

			//---------get currentNumber based on rotation
			this.currentNumber = Math.floor((knobNumbers.maxNumber/360)*rotation);
			if( this.lastNumber == 9999) this.lastNumber = this.currentNumber;

			//---------check if changed direction on the number
			directionNow = (currentNumber > lastNumber);
			if(direction != directionNow)
			{
				directionChanged = true;
			}

			// -----------------------If we hit the target move on to the next one
			var currentTarget = this.listOfTargets[this.targetPointer];
			//console.log("Rotation: %s", input.rotation);
			if (this.currentNumber == currentTarget)
			{
				this.lastTargetPointer = this.targetPointer;
				this.targetPointer++;
				//buzzAudio.tumbler.play();
			}

			//trigger sound if number changed
			if (this.currentNumber != this.lastNumber)
			{
				console.log(this.currentNumber);
				audioManager.playSound(audioManagerAudioObject.NORMAL_CLICK);
			}

			// --------------------------------Reset if we went to far
			// var lastTarget = this.listOfTargets[this.lastTargetPointer];
			// var failDistance = 20;
			// if (	this.lastTargetPointer > 0 &&	
			// 	((lastTarget >= 0 && this.input.rotation > lastTarget+failDistance) ||
			// 	(lastTarget < 0 && this.input.rotation < lastTarget-failDistance))) {
			// 		this.lastTargetPointer = 0;
			// 		this.targetPointer = 0;
			// 		//buzzAudio.failure.play();
			// }

			// ---------------------------------Check if we have finished
			if (this.targetPointer >= this.listOfTargets.length) {
				console.log("Combination Found!");
				this.scene.finalize();
				// Aww yeah!
				this.spin++;
			}
			//save last values
			this.lastNumber = this.currentNumber;

			//update scene
			this.scene.stage.update();
		},
		finalize: function() {
			for(var i = 0 ; i < this.scene.visuals.length ; i++)
			{
				this.scene.scene.visuals[i].visible = false;
			}
		}

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