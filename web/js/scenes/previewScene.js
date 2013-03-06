console.log("Loading preview scene");

var previewScene = (function() {
	//var input;
	var scene;

	var capture;

	var left, right;

	return {
		init: function(scene) {
			console.log("init: scene");

			this.scene = scene;

			var video = document.getElementById("live");
			capture = new createjs.Bitmap(video);

			capture.regX = 320;
			capture.scaleX = -1;
			capture.x =capture.regX+ 80;
			capture.y = 60;
			this.scene.stage.addChild(capture);
			capture.alpha = 0.7;

			//setup indicators
			left = this.scene.visuals[1].bitmap;
			right = this.scene.visuals[2].bitmap;
			left.regX = left.image.width/2;
			left.regY = left.image.height/2;
			this.scene.stage.removeChild(left,right);
			this.scene.stage.addChild(left,right);

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

			left.x = 80 + 640 - inputArray[0].x;
			left.y = 60+ inputArray[0].y;
			left.rotation = inputArray[0].rotation;

			right.x = 80+ 640 - inputArray[2].x - 95;
			right.y = 60+inputArray[2].y - 90;


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
