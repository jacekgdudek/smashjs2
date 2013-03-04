var videoScene = (function() {
	//var input;
	var scene;
	var videoPlayer;

	return {
		init: function(scene) {
			console.log("init: videoScene");

			this.scene = scene;

			//make sure all the assets are visible
			for(var i = 0 ; i < scene.visuals.length ; i++)
			{
				scene.scene.visuals[i].visible = true;
			}

			// Video Player Code
			videoPlayer = document.getElementById("videoPlayer");
			var bitmap =  new createjs.Bitmap (videoPlayer);
			this.scene.stage.addChild (bitmap);

			videoPlayer.src = this.videos[0].src;
			videoPlayer.load();
			videoPlayer.play();

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
						if(scene.visuals[i].bitmap.hitTest( mousePos.stageX - scene.visuals[i].bitmap.x , mousePos.stageY - scene.visuals[i].bitmap.y ))
						{
							addEventEx(scene.visuals[i].downEvent);
							console.log("down state initialized");
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
		if (evt.keyIdentifier=="Left") { videoPlayer.play(); } 
		if (evt.keyIdentifier=="Right") { videoPlayer.pause(); }
	};

})();
