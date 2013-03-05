var introScene = (function() {
	//var input;
	var scene;
	var delay;
	return {
		init: function(scene) {
			console.log("init: tutorialScene");

			this.scene = scene;
			this.delay = 200;

			//make sure all the assets are visible
			for(var i = 0 ; i < scene.visuals.length ; i++)
			{
				scene.scene.visuals[i].visible = true;
			}

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
				for(var i = 0 ; i < scene.visuals.length ; i++)
				{
					if(scene.visuals[i].hasDown)
					{
						if(scene.visuals[i].bitmap.hitTest( mousePos.stageX , mousePos.stageY ))
						{
							addEventEx(scene.visuals[i].downEvent);
							console.log("down state initialized");
						}
					}
				}
			}

		},
		update: function() {

			this.delay--;
			if(this.delay < 0) addEvent("SWITCH_SCENE","tutorial_scene");
			//update scene
			this.scene.stage.update();
		},
		finalize: function() {
			for(var i = 0 ; i < this.scene.visuals.length ; i++)
			{
				this.scene.scene.visuals[i].visible = false;
			}
		},
	};

	function handleKeyDown(evt) {
		// For now we use keyboard controls for the dial
		if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
		if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }
	};

})();
