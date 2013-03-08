function SettingsScene(){}

SettingsScene.prototype = new Scene(settingsSceneStructure);

SettingsScene.prototype.init = function() {
	Scene.prototype.init.call(this);
	this.settings = this.structure.settings;

	for(var i = 0 ; i < this.settings.length ; i++)
	{
		switch(this.settings[i].type)
		{
			case 0:
				var checkbox = new Object();
				this.settings[i].text_bmp = new createjs.Text(this.settings[i].text, "20px Arial", "#ff77ff");
				this.settings[i].normal_bmp = this.structure.visuals[this.settings[i].normal].bitmap.clone();
				this.settings[i].hover_bmp = this.structure.visuals[this.settings[i].hover].bitmap.clone();
				checkbox.ticked = this.structure.visuals[this.settings[i].checkbox[0]].bitmap.clone();
				checkbox.unticked = this.structure.visuals[this.settings[i].checkbox[1]].bitmap.clone();

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
				this.structure.stage.addChild(this.settings[i].normal_bmp, this.settings[i].hover_bmp, checkbox.unticked, checkbox.ticked ,this.settings[i].text_bmp);
				this.settings[i].state = 0;
			break;
			case 1:
				this.settings[i].text_bmp = new createjs.Text(this.settings[i].text, "20px Arial", "#ff77ff");
				this.settings[i].normal_bmp = this.structure.visuals[this.settings[i].normal].bitmap.clone();
				this.settings[i].hover_bmp = this.structure.visuals[this.settings[i].hover].bitmap.clone();
				this.settings[i].normal_bmp.x = 800/2 - this.settings[i].normal_bmp.image.width/2;
				this.settings[i].normal_bmp.y = this.settings[i].hover_bmp.y = 50 + i * 70;
				this.settings[i].hover_bmp.x = 800/2 - this.settings[i].normal_bmp.image.width/2;
				this.settings[i].text_bmp.x = 800/2 - this.settings[i].text_bmp.lineWidth/2 - 60;
				this.settings[i].text_bmp.y = 60 + i * 70;
				this.settings[i].hover_bmp.visible = false;
				this.structure.stage.addChild(this.settings[i].normal_bmp, this.settings[i].hover_bmp, checkbox.unticked, checkbox.ticked ,this.settings[i].text_bmp);
			break;
			case 2:
			break;
			case 3:
			break;
		}
	}


	//define mouse callback
	//handle mouse events
	var structure = this.structure;
	this.stage.onMouseMove = function(mousePos) {
		//check hover on settings 
		for(var i = 0 ; i < structure.settings.length ; i++)
		{
			if(structure.settings[i].normal_bmp.hitTest( mousePos.stageX - structure.settings[i].normal_bmp.x , mousePos.stageY - structure.settings[i].normal_bmp.y ))
			{
				structure.settings[i].hover_bmp.visible = true;
			}
			else
			{
				structure.settings[i].hover_bmp.visible = false;
			}
		}
		/*
		for(var i = 0 ; i < structure.visuals.length ; i++)
		{
			if(structure.visuals[i].hasHover)
			{
				if(structure.visuals[i].bitmap.hitTest( mousePos.stageX , mousePos.stageY ))
				{
					console.log("hover state initialized");
				}
			}
		}*/
	}

	this.stage.onMouseDown = function(mousePos) {
		for(var i = 0 ; i < structure.settings.length ; i++)
		{
			if(structure.settings[i].normal_bmp.hitTest( mousePos.stageX - structure.settings[i].normal_bmp.x , mousePos.stageY - structure.settings[i].normal_bmp.y ))
			{
				switch(structure.settings[i].type)
				{
					case 0:
						if(structure.settings[i].checkbox_bmp.ticked.visible)
						{
							addEvent(structure.settings[i].downEvent, false);
							structure.settings[i].checkbox_bmp.ticked.visible = false;
							structure.settings[i].checkbox_bmp.unticked.visible = true;
							console.log(structure.settings[i].downEvent + " disabled");
						}
						else
						{
							addEvent(structure.settings[i].downEvent, true);
							structure.settings[i].checkbox_bmp.ticked.visible = true;
							structure.settings[i].checkbox_bmp.unticked.visible = false;
							console.log(structure.settings[i].downEvent + " enabled");
						}
					break;
					case 1:
						addEvent(structure.settings[i].downEvent, false);
					break;
				}

			}
		}

		if(structure._name == currScene)
		{
			for(var i = 0 ; i < structure.visuals.length ; i++)
			{
				if(structure.visuals[i].hasDown)
				{
					if(structure.visuals[i].bitmap.hitTest( mousePos.stageX - structure.visuals[i].bitmap.x , mousePos.stageY - structure.visuals[i].bitmap.y ))
					{
						addEventEx(structure.visuals[i].downEvent);
						console.log("down state initialized");
					}
				}
			}
		}
	}
}
