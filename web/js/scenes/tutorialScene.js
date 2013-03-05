var tutorialHintType = {
'DELAY':0,
'FIDUCIAL_EXISTS':1,
'RELATIVE_ROTATION_GREATER':2,
'RELATIVE_ROTATION_LESSER':3,
'DIRECTION_CHANGED':4,
'DIRECTION_CHANGED_AT':5,
'GOT_TO_NUMBER':6,
'VOLUME_OVER':7,
'FAR_FROM_NUMBER_AFTER_CLICK':8,

};


var tutorialScene = (function() {

	var currentHint, hints, delay, startRotation/* for relative roation conditions*/ , volumeTarget, wentPastTarget;

	var currentNumber, lastNumber;

	var listOfTargets, targetPointer, lastTargetPointer, spin, direction, volume;

	var scene;
	/// text ouput
	var message;

	//verbouse
	var lastHint;

	return {
		init: function(scene) {
			console.log("init: tutorialScene");

			this.scene = scene;
			this.hints = scene.hints;

			sweet_spot = this.scene.sweet_spot;
			this.currentHint = 0;

			// Setup the game stage
			knob = this.scene.visuals[1];
			knob.bitmap.x = 800-knob.bitmap.image.width;//900+139;
			knob.bitmap.y = 20;//200+139;
			knob.bitmap.regX += 0;//139;
			knob.bitmap.regY += 0;//139;
			
			knobNumbers = this.scene.visuals[2];			
			knobNumbers.bitmap.x = knob.bitmap.x+115;//900+139;
			knobNumbers.bitmap.y = knob.bitmap.y+117;//200+139;
			knobNumbers.bitmap.regX = 115;//139;
			knobNumbers.bitmap.regY = 117;//139;

			stethoscope = this.scene.visuals[3];			
			stethoscope.bitmap.x = 0;//900+139;
			stethoscope.bitmap.y = 600;//200+139;

			// Create a list of random targets e.g. 53, -124, 200, 5, etc
			this.listOfTargets = new Array();

			this.targetPointer = 0;
			this.lastTargetPointer = 0;
			this.spin=0;
			this.lastNumber = 0;
			this.delay = 9999;
			this.startRotation = 9999;
			this.volumeTarget = 9999;
			this.wentPastTarget = false;
			this.volume = 0;
			this.lastHint = -1;

			// add a handler for all the events we're interested in
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
			//hide GUI
			hideGUI();

			// verbouse
			if(this.lastHint != this.currentHint)
			{
				console.log("Current Hint : " + this.currentHint);
				this.lastHint = this.currentHint;
			}


			// ---------------------------------Check if we have finished
			if (this.currentHint >= this.hints.length) {
				console.log("Combination Found!");
				addEventEx(this.scene.nextStageEvent);
				return;
				// Aww yeah!
			}

			//---------------------------------------------update input
			var directionNow = false;
			var directionChanged = false;
			if(!this.hints[this.currentHint].fid0_disabled)
			{
				stethoscope.bitmap.x = 800 - stethoscope.bitmap.image.width - (((800 - stethoscope.bitmap.image.width)/(640 - (2*100)))*(inputArray[0].x - 100));
				stethoscope.bitmap.y = (600/480)*inputArray[0].y;
			}
			if(!this.hints[this.currentHint].fid2_disabled)
			{
				var rotation = inputArray[2].rotation;
				// Keep this.input rotation within bounds
				if (rotation > 360) { rotation = 360; }
				if (rotation <= -360) { rotation = -360; }

				// Make the dial spin if we win the game
				var spinSpeed = 9;
				var spinDuration = 400;
				knobNumbers.bitmap.rotation = rotation;

				//---------get currentNumber based on rotation
				this.currentNumber = Math.floor((knobNumbers.maxNumber/360)*rotation);
				//---------check if changed direction on the number
				if(this.currentNumber != this.lastNumber)
				{
					directionNow = (this.currentNumber > this.lastNumber);
					if(this.direction != directionNow)
					{
						console.log("Changed Direction!");
						directionChanged = true;
						this.direction = directionNow;
					}
				}
			}

			//------------------------------------ update volume
			//distance from sweet spot
			var distance = Math.sqrt(Math.pow(this.sweet_spot.x - stethoscope.bitmap.x,2) + Math.pow(this.sweet_spot.y - stethoscope.bitmap.y,2));
			if (distance > 100) distance = 100;
			this.volume = distance;

			//---------------------------------------------process Hint
			switch(this.hints[this.currentHint].successCondition._type)
			{
				//--DELAY
				case 0:
					//set delay if not set
					if( this.delay == 9999 ) this.delay = this.hints[this.currentHint].successCondition._value;
					// -- delay
					this.delay--;
					//if delay finnished
					if( this.delay < 0 )
					{
						this.delay = 9999;
						this.currentHint++;
					}
				break;
				//--Fiducial was updated
				case 1:
					//check if was updated
					if( inputArray[this.hints[this.currentHint].successCondition._value].wasUpdated == true )
					{
						this.currentHint++;
					}
				break;
				//--relative rotation greater than
				case 2:
					//set start rotation if not set
					if(this.startRotation == 9999) this.startRotation = knobNumbers.bitmap.rotation;
					if(directionNow && this.startRotation + this.hints[this.currentHint].successCondition._value)
					{
						startRotation = 9999;
						this.currentHint++;
					}
				break;
				//--relative rotation lesser than
				case 3:
					//set start rotation if not set
					if(this.startRotation == 9999) this.startRotation = knobNumbers.bitmap.rotation;
					if(!directionNow && this.startRotation - this.hints[this.currentHint].successCondition._value)
					{
						startRotation = 9999;
						this.currentHint++;
					}
				break;
				//--change direction
				case 4:
					//set start rotation if not set
					if(directionChanged) 
					{
						this.currentHint++;
					}
				break;
				//--change direction at number
				case 5:
					//set start rotation if not set
					if(directionChanged && (this.currentNumber >= this.hints[this.currentHint].successCondition._value-1 ||
												 this.currentNumber <= this.hints[this.currentHint].successCondition._value+1)) 
					{
						this.currentHint++;
					}
				break;
				//--get to number
				case 6:
					//set start rotation if not set
					if(this.currentNumber == this.hints[this.currentHint].successCondition._value) 
					{
						console.log("Got to number");
						this.currentHint++;
					}
				break;
				//--volume over
				case 7:
					//set volume target if not set
					console.log("distance : " + this.volume);
					if(this.volumeTarget == 9999) this.volumeTarget = this.hints[this.currentHint].successCondition._value;
					if(this.volume < this.volumeTarget)
					{
						this.volumeTarget = 9999;
						this.currentHint++;
					}
				break;
			}

			//--------------------------------------------------updateMessage
			if(typeof this.hints[this.currentHint].message !== 'undefined')
			{
				if(this.hints[this.currentHint].message !=  this.scene.messages[0].text.text)
				{
					this.scene.stage.removeChild(this.scene.messages[0].bg)
					changeText(this.hints[this.currentHint].message , this.scene.messages[0]);
					this.scene.messages[0].bg.visible = true;
					this.scene.messages[0].text.visible = true;
					this.scene.stage.addChild(this.scene.messages[0].bg)
				}
				//make invisible if empt
			}

			// -----------------------If we hit the target move on to the next one
			var currentTarget = this.listOfTargets[this.targetPointer];

			//--------------------------update ALTMessage
			if(typeof this.hints[this.currentHint].messageEx !== 'undefined')
			{
				for(var i = 0 ; i < hints[this.currentHint].messageEx.length ; i++)
				{
					switch(this.hints[this.currentHint].messageEx[i].condition.type)
					{
						case tutorialHintType.FAR_FROM_NUMBER_AFTER_CLICK:
							var distance = (currentNumber > currentTarget ? currentNumber-currentTarget : currentTarget - currentNumber);
							if(this.wentPastTarget && distance > this.hints[this.currentHint].messageEx[i].condition._value)
							{
								this.message = hints[this.currentHint].message;
							}
						break;
					}
				}
			}

			//trigger sound if number changed
			if (this.currentNumber != this.lastNumber)
			{
				console.log(this.currentNumber);
				audioManager.playSound(audioManagerAudioObject.NORMAL_CLICK);
			}

			//save last values
			this.lastNumber = this.currentNumber;

			//update scene
			this.scene.stage.update();
		},
		finalize: function() {
			for(var i = 0 ; i < this.scene.visuals.length ; i++)
			{
				this.scene.visuals[i].visible = false;
			}
		},

	};
	function handleKeyDown(evt) {
		// For now we use keyboard controls for the dial
		if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
		if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }
		if (evt.keyCode =="I".charCodeAt(0)) { 
			useFiducials = !useFiducials;
			console.log("using Fiducials : " + useFiducials);
		}

		/*
		if (	((evt.keyIdentifier=="Left") || (evt.keyIdentifier=="Right")) &&    
		      	buzzAudio.click.getTime()==0) {
			// Play the sound if we pressed the button and it's not playing
			buzzAudio.click.play();
		}*/
		this.scene.stage.update();
	};

})();
