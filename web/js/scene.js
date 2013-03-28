console.log("Loading base scene");

var overlay;
var defaultScene = (function() {
	//var input;
	var scene;

	var overlay;

	return {
		init: function(scene) {
			console.log("init: scene");

			this.scene = scene;

			for(var i = 0; i < this.scene.visuals.length ; i ++)
			{
				this.scene.visuals[i].bitmap.alpha = 1;
				this.scene.stage.removeChild(this.scene.visuals[i].bitmap);
				this.scene.stage.addChild(this.scene.visuals[i].bitmap);

				if(typeof this.scene.visuals[i].hover !== 'undefined')
				{
					this.scene.stage.removeChild(this.scene.visuals[i].hover);
					this.scene.stage.addChild(this.scene.visuals[i].hover);
				}
			}

			// init overlay if exists
			if(typeof scene.overlayStructure !== 'undefined')
			{
				this.overlay = new StageOverlay(scene.stage);
				this.overlay.init(scene.overlayStructure);
			}

			setGUI();

			

			// add a handler for all the events we're interested in
			//this.scene.stage.onTick = update;
			document.onkeydown = handleKeyDown;

			//define mouse callback
			//handle mouse events
			this.scene.stage.onMouseMove = function(mousePos) {
				var collidedObject = new Object();
				var currentId = -1;
				if(scene._name == currScene)
				{
					for(var i = 0 ; i < scene.visuals.length ; i++)
					{
						if(typeof scene.visuals[i].hover !== 'undefined')
						{
							scene.visuals[i].hover.visible = false;

							if(scene.visuals[i].bitmap.hitTest( mousePos.stageX - scene.visuals[i].bitmap.x , mousePos.stageY - scene.visuals[i].bitmap.y ))
							{
								if(scene.stage.getChildIndex(scene.visuals[i].bitmap) > currentId)
								{
									collidedObject = scene.visuals[i];
								}
								//console.log("hover state initialized");
							}
						}
					}

					if(typeof collidedObject.hover !== 'undefined')
					{
						collidedObject.hover.visible = true;
						console.log("hover effect");
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

			//update overlay
			if(typeof this.overlay !== 'undefined')
			{
				this.overlay.update();
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
			//finalize overlay
			if(typeof this.overlay !== 'undefined')
			{
				this.overlay.finalize();
			}

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
