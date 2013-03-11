console.log("Loading base scene");

var settingsScene = (function() {
	//var input;
	var scene;

	var settings;

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

			this.settings = this.scene.settings;

			for(var i = 0 ; i < this.scene.settings.length ; i++)
			{
				switch(this.scene.settings[i].type)
				{
					case 0:

						var checkbox = new Object();
						this.settings[i].text_bmp = new createjs.Text(this.settings[i].text, "20px Arial", "#ff77ff");
						this.settings[i].normal_bmp = this.scene.visuals[this.settings[i].normal].bitmap.clone();
						this.settings[i].hover_bmp = this.scene.visuals[this.settings[i].hover].bitmap.clone();
						checkbox.ticked = this.scene.visuals[this.settings[i].checkbox[0]].bitmap.clone();
						checkbox.unticked = this.scene.visuals[this.settings[i].checkbox[1]].bitmap.clone();

						this.settings[i].normal_bmp.x = 800/2 - this.settings[i].normal_bmp.image.width/2;
						this.settings[i].normal_bmp.y = this.settings[i].hover_bmp.y = 50 + i * 70;
						this.settings[i].hover_bmp.x = 800/2 - this.settings[i].normal_bmp.image.width/2;;
						checkbox.ticked.x = 800/2 + this.settings[i].normal_bmp.image.width/2 - 50;
						checkbox.unticked.x = 800/2 + this.settings[i].normal_bmp.image.width/2 - 50;
						checkbox.unticked.y = checkbox.ticked.y = 70 + i * 70;
						this.settings[i].text_bmp.x = 800/2 - this.settings[i].text_bmp.lineWidth/2 - 60;
						this.settings[i].text_bmp.y = 60 + i * 70;

						this.settings[i].checkbox_bmp = checkbox;
						this.settings[i].hover_bmp.visible = false;
						this.scene.stage.addChild(this.settings[i].normal_bmp, this.settings[i].hover_bmp, checkbox.unticked, checkbox.ticked ,this.settings[i].text_bmp);
						this.settings[i].state = 0;
					break;
					case 1:
						this.settings[i].text_bmp = new createjs.Text(this.settings[i].text, "20px Arial", "#ff77ff");
						this.settings[i].normal_bmp = this.scene.visuals[this.settings[i].normal].bitmap.clone();
						this.settings[i].hover_bmp = this.scene.visuals[this.settings[i].hover].bitmap.clone();
						this.settings[i].normal_bmp.x = 800/2 - this.settings[i].normal_bmp.image.width/2;
						this.settings[i].normal_bmp.y = this.settings[i].hover_bmp.y = 50 + i * 70;
						this.settings[i].hover_bmp.x = 800/2 - this.settings[i].normal_bmp.image.width/2;
						this.settings[i].text_bmp.x = 800/2 - this.settings[i].text_bmp.lineWidth/2 - 60;
						this.settings[i].text_bmp.y = 60 + i * 70;
						this.settings[i].hover_bmp.visible = false;
						this.scene.stage.addChild(this.settings[i].normal_bmp, this.settings[i].hover_bmp, checkbox.unticked, checkbox.ticked ,this.settings[i].text_bmp);
					break;
					case 2:
					break;
					case 3:
					break;
				}

				if(i == 1 && !flipX)
				{
					this.settings[i].checkbox_bmp.ticked.visible = false;
				}
			}



			// add a handler for all the events we're interested in
			//this.scene.stage.onTick = update;
			document.onkeydown = handleKeyDown;

			//define mouse callback
			//handle mouse events
			this.scene.stage.onMouseMove = function(mousePos) {
				//check hover on settings 
				for(var i = 0 ; i < scene.settings.length ; i++)
				{
					if(scene.settings[i].normal_bmp.hitTest( mousePos.stageX - scene.settings[i].normal_bmp.x , mousePos.stageY - scene.settings[i].normal_bmp.y ))
					{
						scene.settings[i].hover_bmp.visible = true;
					}
					else
					{
						scene.settings[i].hover_bmp.visible = false;
					}
				}
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
					for(var i = 0 ; i < scene.settings.length ; i++)
					{
						if(scene.settings[i].normal_bmp.hitTest( mousePos.stageX - scene.settings[i].normal_bmp.x , mousePos.stageY - scene.settings[i].normal_bmp.y ))
						{
							switch(scene.settings[i].type)
							{
								case 0:
									if(scene.settings[i].checkbox_bmp.ticked.visible)
									{
										addEvent(scene.settings[i].downEvent, false);
										scene.settings[i].checkbox_bmp.ticked.visible = false;
										scene.settings[i].checkbox_bmp.unticked.visible = true;
										console.log(scene.settings[i].downEvent + " disabled");
									}
									else
									{
										addEvent(scene.settings[i].downEvent, true);
										scene.settings[i].checkbox_bmp.ticked.visible = true;
										scene.settings[i].checkbox_bmp.unticked.visible = false;
										console.log(scene.settings[i].downEvent + " enabled");
									}
								break;
								case 1:
									addEvent(scene.settings[i].downEvent, false);
								break;
							}

						}
					}
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

			hideGUI();

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