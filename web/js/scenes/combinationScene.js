//open delay;
	var openDelay;

var combinationScene = (function() {

	var listOfTargets, targetPointer, lastTargetPointer , spin ,direction;

	var currentNumber, lastNumber, lastNumberAngle;

	var volume;

	var scene, sweet_spot;

	//indicator references;
	var indicator;

	//out flags
	var outRight, outLeft;

	return {
		init: function(scene) {
			console.log("init: combinationScene");

			this.scene = scene;
			for(var i = 0; i < this.scene.visuals.length ; i ++)
			{
				this.scene.visuals[i].bitmap.alpha = 1;
				this.scene.stage.removeChild(this.scene.visuals[i].bitmap);
				this.scene.stage.addChild(this.scene.visuals[i].bitmap);
				if(i ==0)
				{
					//setup reflection
					reflection = new Reflection(scene.stage);
					reflection.init(0.1);
				}
			}

			setGUI(true);
			
			//start countdown
			armHeat();
			
			sweet_spot = this.scene.sweet_spot;
			// Setup the game stage
			knob = this.scene.visuals[1];
			knob.bitmap.x = 800-knob.bitmap.image.width+100;//900+139;
			knob.bitmap.y = 190;//200+139;
			knob.bitmap.regX = knob.bitmap.image.width/2;//139;
			knob.bitmap.regY = knob.bitmap.image.height/2;//139;

			knobNumbers = this.scene.visuals[2];			
			knobNumbers.bitmap.x = knob.bitmap.x;//900+139;
			knobNumbers.bitmap.y = knob.bitmap.y;//200+139;
			knobNumbers.bitmap.regX = knob.bitmap.image.width/2;//139;
			knobNumbers.bitmap.regY = knob.bitmap.image.height/2;//139;

			stethoscope = this.scene.visuals[3];			
			stethoscope.bitmap.x = 0;//900+139;
			stethoscope.bitmap.y = 600;//200+139;

			handle = this.scene.visuals[6];
			handle.bitmap.rotation = 0;

			// Create a list of random targets e.g. 53, -124, 200, 5, etc
			this.listOfTargets = new Array();

			// create the targets
			numberOfTargets = 4;
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
			this.lastNumberAngle = 0;
			this.outRight = false;
			this.outLeft = false;
			this.volume = 0;
			openDelay = -1;

			//load indicator
			indicator = new CombinationIndicator(this.scene.stage);
			indicator.init(currentJob.risk, this.scene.visuals[5],numberOfTargets);

			// add a handler for all the events we're interested in
			//this.scene.stage.onTick = update;
			document.onkeydown = handleKeyDown;

			//define mouse callback
			//handle mouse events
			this.scene.stage.onMouseMove = function(mousePos) {
				if(!useFiducials)
				{
					inputArray[0].x = 640 - (mousePos.stageX/800)*640;
					inputArray[0].y = (mousePos.stageY/600)*480;
					inputArray[0].wasUpdated = true;
				}
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
			//check if finnished
			if(openDelay != -1)
			{
				beforeOpen(openDelay,handle );
				openDelay++;
			}
			else
			{

				//update indicator
				indicator.update();
				//-------update sthetoscope
				//scale up and flip as well
				stethoscope.bitmap.x = (((800 - stethoscope.bitmap.image.width)/(640 - (2*100)))*(inputArray[0].x - 100));
				stethoscope.bitmap.y = (600/480)*inputArray[0].y - 50;
				//------------------------------------ update volume
				//distance from sweet spot
				var distance = Math.sqrt(Math.pow(this.sweet_spot.x - stethoscope.bitmap.x,2) + Math.pow(this.sweet_spot.y - stethoscope.bitmap.y,2));
				if (distance > 100) distance = 100;
				this.volume =  (100-distance)/100;

				//----------------------------------- update dial
				var directionNow = false;
				var directionChanged = false;

				var rotation = inputArray[2].relative_rotation;
				//console.log("relative roation : " +inputArray[2].relative_rotation + "  angle: " + inputArray[2].startingAngle);
				// Keep this.input rotation within bounds
				if (rotation > 360) { rotation = 360; }
				if (rotation <= -360) { rotation = -360; }

				//validate rotation based on set span
				if(!outRight && !outLeft)
				{
					if(rotation > knobNumbers.span/2 && rotation < 180)
					{
						outRight = true;
					}
					else if(rotation < 360 - knobNumbers.span/2 && rotation > 180)
					{
						outLeft = true;
					}
				}
				else if (outRight)
				{
					if(rotation < knobNumbers.span/2)
					{
						outRight = false;
					}
					else
					{
						rotation = knobNumbers.span/2;
					}
				}
				else if (outLeft)
				{
					if(rotation > 360 - knobNumbers.span/2)
					{
						outLeft = false;
					}
					else
					{
						rotation = 360 - knobNumbers.span/2;
					}
				}
				

				//validate lastNumber Angle
				if(rotation <180 && lastNumberAngle > 180)
				{
					lastNumberAngle = lastNumberAngle - 360;
				} 
				else if(rotation >180 && lastNumberAngle < 180) 
				{
					lastNumberAngle = lastNumberAngle + 360;
				}

				knobNumbers.bitmap.rotation = lastNumberAngle + 3*(rotation-lastNumberAngle)/5;
				//rotate knob as well
				knob.bitmap.rotation = lastNumberAngle + 3*(rotation-lastNumberAngle)/5;

				///apply offset
				var numRotation = -1*rotation + knobNumbers.offset + 360;
				if(numRotation > 360) numRotation = numRotation - 360;
				else if(numRotation < 0) numRotation = numRotation + 360;

				var actualMaxNumber = Math.floor((360/knobNumbers.span)*knobNumbers.maxNumber);

				//---------get currentNumber based on rotation
				this.currentNumber = Math.floor((actualMaxNumber/360)*(numRotation));
				//this.currentNumber += Math.floor(actualMaxNumber-knobNumbers.maxNumber - 1;
				//translate overlap
				if(this.currentNumber >= actualMaxNumber) this.currentNumber = Math.floor(this.currentNumber - actualMaxNumber);
				//validate number
				if(this.currentNumber >= knobNumbers.maxNumber) this.currentNumber = this.lastNumber;
				else if ( this.currentNumber < 0 ) this.currentNumber = 0;

				if( this.lastNumber == 9999) this.lastNumber = this.currentNumber;

				//---------check if changed direction on the number
				if(this.currentNumber != this.lastNumber)
				{
					if(this.currentNumber <= knobNumbers.maxNumber*0.25 && this.lastNumber >= knobNumbers.maxNumber*0.75) 
					{
						directionNow = true;
					}
					else if(this.currentNumber >= knobNumbers.maxNumber*0.75 && this.lastNumber <= knobNumbers.maxNumber*0.25) 
					{
						directionNow = false;
					}
					else
					{
						directionNow = (this.currentNumber > this.lastNumber);
					}

					if(this.direction != directionNow)
					{
						console.log("Changed Direction!");
						directionChanged = true;
						this.direction = directionNow;
					}
				}

				// -----------------------If we hit the target move on to the next one
				var currentTarget = this.listOfTargets[this.targetPointer];
				//console.log("Rotation: %s", input.rotation);
				if (directionChanged)
				{
					if(this.lastNumber == currentTarget)
					{
						//trigger next pointer
						this.lastTargetPointer = this.targetPointer;
						this.targetPointer++;
						//pass to indicator
						indicator.add();
						console.log("Getting next number");
					}
					else
					{
						//reset combination
						this.targetPointer = 0;
						this.lastTargetPointer = 0;
						//pass to indicator
						indicator.reset();
						console.log("Resetting combination !");
					}
					
				}

				//trigger sound and visual rotation if number changed
				if (this.currentNumber != this.lastNumber)
				{
					console.log(this.currentNumber);
					knobNumbers.bitmap.rotation = rotation;
					//rotate knob as well
					knob.bitmap.rotation = rotation;

					lastNumberAngle = rotation;

					audioManager.playSoundAtVolume(audioManagerAudioObject.NORMAL_CLICK, this.volume, false);
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
					openDelay = 0;
				}
				//save last values
				this.lastNumber = this.currentNumber;
			}

			//update scene
			this.scene.stage.update();
		},
		finalize: function() {
			reflection.finalize();
			indicator.finalize();
			for(var i = 0 ; i < this.scene.visuals.length ; i++)
			{
				this.scene.scene.visuals[i].visible = false;
			}
			hideGUI();
		}

	};
	function handleKeyDown(evt) {
		// For now we use keyboard controls for the dial
		if (evt.keyIdentifier=="Left") { 
			inputArray[2].rotation -= 5;
			if(inputArray[2].rotation < 0) inputArray[2].rotation = 355; 
		} 
		if (evt.keyIdentifier=="Right") { 
			inputArray[2].rotation += 5;
			if(inputArray[2].rotation > 360) inputArray[2].rotation = 5;
		}
		if (evt.keyCode =="S".charCodeAt(0)) { 
			openDelay = 0;
			//addEvent("FINNISHED_JOB",true);
		}
		if (evt.keyCode =="F".charCodeAt(0)) { 
			addEvent("FINNISHED_JOB",false);
		}
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
	};

	function beforeOpen(openDelay, handle)
	{
		if(openDelay < 30)
		{
			handle.bitmap.rotation += (openDelay*openDelay)/12;
			
		}
		else
		{
			addEvent("FINNISHED_JOB",true);
		}
	}

	function initIndicator(risk, pointerRef)
	{
		var num = Math.floor(Math.random*2 + 1);

		for(var i = 0 ; i < num ; i ++)
		{
			var indicatorPointer = new Object();

			indicatorPointer.bmp = pointerRef.bitmap.clone();
			indicatorPointer.bmp.rotation = pointerRef.startAngle + i*widthAngle;

			this.scene.stage.addChild(indicatorPointer.bmp);
			this.indicatorPointers.push(indicatorPointer);

		}
	};


})();