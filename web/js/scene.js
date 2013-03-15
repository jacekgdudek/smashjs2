console.log("Loading base scene");

var overlay;
var defaultScene = (function() {
	//var input;
	var scene;

	var blinkerReset;
	var blinkerPause;

	return {
		init: function(scene) {
			console.log("init: scene");

			this.scene = scene;

			for(var i = 0; i < this.scene.visuals.length ; i ++)
			{
				this.scene.visuals[i].bitmap.alpha = 1;
				this.scene.stage.removeChild(this.scene.visuals[i].bitmap);
				this.scene.stage.addChild(this.scene.visuals[i].bitmap);
			}
			setGUI();

			if(this.scene._name == "welcome")
			{
				overlay = this.scene.visuals[5];
			}
			else if(this.scene._name == "base_scene")
			{
				overlay = this.scene.visuals[4];
			}
			overlay.bitmap.alpha = 0;
			blinkerReset = 0;
			blinkerPause = 0;

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
				var collidedObject = new Object();
				var currentId = -1;
				if(scene._name == currScene)
				{
					for(var i = 0 ; i < scene.visuals.length ; i++)
					{
						if(scene.visuals[i].hasDown)
						{
							if(scene.visuals[i].bitmap.hitTest( mousePos.stageX - scene.visuals[i].bitmap.x , mousePos.stageY - scene.visuals[i].bitmap.y ))
							{
								if(scene.stage.getChildIndex(scene.visuals[i].bitmap) > currentId)
								{
									collidedObject = scene.visuals[i];
								} 
							}
						}
					}
				}

				if(typeof collidedObject.downEvent !== 'undefined')
				{
					addEventEx(collidedObject.downEvent);
					console.log("down state initialized");
				}
			}

		},
		update: function() {

			//blink blibnk blink
			if(blinkerReset > 300)
			{
				blinkerReset = 0;
				blinkerPause = 0;
				overlay.bitmap.alpha = 0;
				console.log("Reset");
			}
			else
			{
				blinkerReset++;
				if(blinkerPause > 250)
				{
					//blibky blinky
					console.log("Blink");
					overlay.bitmap.alpha = Math.random(); // random value between 0 and 1;
					audioManager.playSoundAtVolume(audioManagerAudioObject.BULB_SOUND, 1, false);
				}
				else
				{
					blinkerPause++;
				}
			}

			if(this.scene._name == "welcome")
			{
				hideGUI();
			}
			else
			{
				//play background sound
				audioManager.playSoundAtVolume(audioManagerAudioObject.BACKGROUND_MUSIC, background_volume, true);
			}
			
			//update scene
			this.scene.stage.update();
		},
		finalize: function() {
			for(var i = 0 ; i < this.scene.visuals.length ; i++)
			{
				this.scene.visuals[i].visible = false;
			}
			if (this.scene.hasOwnProperty("messages")) {
				for(var i = 0 ; i < this.scene.messages.length ; i++)
				{
					this.scene.messages[i].bg.visible = false;
					this.scene.messages[i].text.visible = false;
				}
			}
			hideGUI();
		},
	};



	function handleKeyDown(evt) {
		// For now we use keyboard controls for the dial
		if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
		if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }
	};

})();
