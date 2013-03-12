
var rewardScene = (function() {
	//var input;
	var scene;

	var grid;

	//rewards
	var rewardId;
	var rewardImages = new Array();
	var _rewards = new Array();

	return {
		init: function(scene) {
			console.log("init: reward scene");

			this.scene = scene;
			//set ui
			for(var i = 0; i < this.scene.visuals.length ; i ++)
			{
				this.scene.visuals[i].bitmap.alpha = 1;
				this.scene.stage.removeChild(this.scene.visuals[i].bitmap);
				this.scene.stage.addChild(this.scene.visuals[i].bitmap);
			}
			setGUI();


			//make sure all the assets are visible
			for(var i = 0 ; i < scene.visuals.length ; i++)
			{
				if(scene.visuals[i].visible != false)
					scene.visuals[i].bitmap.visible = true;
			}

			//--------initialize grid
			grid = new Array(scene.rewardGrid.width);
			for (var i = 0; i < scene.rewardGrid.width; i++) {
				grid[i] = new Array(scene.rewardGrid.height);
				for (var j = 0; j < scene.rewardGrid.height; j++) {
					var rewardObject = new Object();
					rewardObject.visualId = -1;
					grid[i][j] = rewardObject;
				}
			}

			randObjects(/*grid*/ grid,
						/*reward value*/currentJob.reward,
						_rewards);

			repositionObjects(grid);

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
					//---------------------------mouse down on reward
					for(var i = 0 ; i < _rewards.length ; i++)
					{
						if(rewardImages[i].hasDown && rewardImages[i].bitmap.visible)
						{
							if(rewardImages[i].bitmap.hitTest( mousePos.stageX - rewardImages[i].bitmap.x , mousePos.stageY - rewardImages[i].bitmap.y ))
							{
								if(rewardImages[i].downEvent.type == "SPECIAL_REWARD_BUTTON_DOWN") addEvent(rewardImages[i].downEvent.type, rewardImages[i].downEvent.content);
								else addEvent(rewardImages[i].downEvent.type, _rewards[i].value);
								rewardImages[i].bitmap.visible = false;
								console.log("down state on reward initialized");
							}
						}
					}

					for(var i = 0 ; i < scene.visuals.length ; i++)
					{
						if(scene.visuals[i].hasDown)
						{
							if(scene.visuals[i].bitmap.hitTest( mousePos.stageX - scene.visuals[i].bitmap.x , mousePos.stageY - scene.visuals[i].bitmap.y ))
							{
								if(scene.visuals[i].downEvent.type != "ADD_CREDITS")
								{
									addEventEx(scene.visuals[i].downEvent);
									console.log("down state initialized");
								}
							}
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
				this.scene.visuals[i].bitmap.visible = false;
			}
			if (typeof this.scene.messages !== 'undefined') {
				for(var i = 0 ; i < this.scene.messages.length ; i++)
				{
					this.scene.messages[i].bg.visible = false;
					this.scene.messages[i].text.visible = false;
				}
			}
			for(var i = 0 ; i < rewardImages.length ; i++)
			{
				rewardImages[i].bitmap.visible = false;
				this.scene.stage.removeChild(rewardImages[i]);
			}
			rewardImages = new Array();
			_rewards = new Array();
			hideGUI();
			
		},
	};

	function handleKeyDown(evt) {
		// For now we use keyboard controls for the dial
		if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
		if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }
	};

	function randObjects(grid, rewardLevel, rewards) {
		var scene = scenes[currScene];
		possibleRewards = scenes[currScene].rewards;

		var rewardValue = rewardLevel * 1000;

		//------------------------randomize rewards
		var finnished = false;
		while(!finnished)
		{
			rewardId = Math.floor(Math.random()*possibleRewards.length);

			if(possibleRewards[rewardId].value > rewardValue){
				finnished = true;
			}
			else
			{
				rewardValue -= possibleRewards[rewardId].value;
				rewards.push(possibleRewards[rewardId]);
			}
		}
		//------------------------add special Reward
		if(rewardLevel > 3)
		{
			finnished = false;
			while(!finnished)
			{
				finnished = true;
				rewardId = Math.floor(Math.random()*specialRewards.rewards.length);

				for(var i = 0 ; i < currSpecialRewards.length ; i ++)
				{
					if(currSpecialRewards[i] == rewardId) finnished = false;
				}

				if(finnished)
				{
					specialRewards.rewards[rewardId].visualId = -2;
					rewards.push(specialRewards.rewards[rewardId]);
				}
			}	
		}

		//----------------------randomize positions
		for ( var i = 0 ; i < rewards.length ; i++)
		{
			var foundSpot = false;
			while(!foundSpot)
			{
				x = Math.floor(Math.random()*grid.length);
				y = Math.floor(Math.random()*grid[0].length);
				if(grid[x][y].visualId == -1)
				{
					foundSpot = true;
					grid[x][y] = rewards[i];
				}
			}
		}

	}

	function repositionObjects(grid)
	{
		for (var i = 0; i < grid.length; i++) {
				for (var j = 0; j < grid[i].length; j++) {
					if(grid[i][j].visualId != -1)
					{
						if(grid[i][j].visualId == -2)
						{
							
							//special prize
							var rewardBMP  = new Object();
							rewardBMP.hasDown = true;
							rewardBMP.downEvent = specialRewards.rewards[grid[i][j].contentId].downEvent;
							rewardBMP.bitmap =  specialRewards.rewards[grid[i][j].contentId].thumbnail.clone();//new createjs.Bitmap(scenes[currScene].visuals[grid[i][j]].src);
							rewardBMP.bitmap.x = 45+i * 90;
							rewardBMP.bitmap.y = 30+j * 175;
							rewardBMP.bitmap.visible = true;
							console.log("putting object on x:" + (i+1)*100 + " y : " + (100+(j*100)));
							// rewardBMP.bitmap.cache(0, 0, rewardBMP.bitmap.image.width, rewardBMP.bitmap.image.height);
							// /*var cFilter;
							// cFilter = new createjs.ColorFilter(0, 1, 0, 1);
							// rewardBMP.bitmap.filters = [cFilter];
							// */
							// if (grid[i][j].visualId == 4){
							// 	var cFilter;
							// 	/*cFilter = new createjs.ColorFilter(1, 0, 0, 1);
							// 	rewardBMP.bitmap.filters = [cFilter];*/
							// 	console.log(grid[i][j].rgbColor);
							// 	if(grid[i][j].rgbColor == "red"){
							// 		cFilter = new createjs.ColorFilter(2, 0.9, 0.9, 1); ///RGBA values
							// 		rewardBMP.bitmap.filters = [cFilter]; //applying filter
							// 	}
							// 	else if(grid[i][j].rgbColor == "green"){
							// 		cFilter = new createjs.ColorFilter(0.9, 2, 0.9, 1);
							// 		rewardBMP.bitmap.filters = [cFilter];
							// 	}
							// 	else if(grid[i][j].rgbColor == "blue"){
							// 		cFilter = new createjs.ColorFilter(0.9, 0.9, 2, 1);
							// 		rewardBMP.bitmap.filters = [cFilter];
							// 	}
							//}
							
							rewardImages.push(rewardBMP);
							scenes[currScene].stage.addChild(rewardBMP.bitmap);
						}
						else
						{
							//regular prize
						console.log("Reward visualId : " + grid[i][j].visualId);
						var rewardBMP  = new Object();
						rewardBMP.hasDown = true;
						rewardBMP.downEvent = scenes[currScene].visuals[grid[i][j].visualId].downEvent;
						rewardBMP.bitmap =  scenes[currScene].visuals[grid[i][j].visualId].bitmap.clone();//new createjs.Bitmap(scenes[currScene].visuals[grid[i][j]].src);
						rewardBMP.bitmap.x = 45+i * 90;
						rewardBMP.bitmap.y = 30+j * 175;
						rewardBMP.bitmap.visible = true;
						console.log("putting object on x:" + i*100 + " y : " + j*100);
						
						rewardBMP.bitmap.cache(0, 0, rewardBMP.bitmap.image.width, rewardBMP.bitmap.image.height);
						/*var cFilter;
						cFilter = new createjs.ColorFilter(0, 1, 0, 1);
						rewardBMP.bitmap.filters = [cFilter];
						*/
						//if (grid[i][j].visualId == 4){
							var cFilter;
							/*cFilter = new createjs.ColorFilter(1, 0, 0, 1);
							rewardBMP.bitmap.filters = [cFilter];*/
							console.log(grid[i][j].rgbColor);
							if(grid[i][j].rgbColor == "red"){
								cFilter = new createjs.ColorFilter(2, 0.9, 0.9, 1); ///RGBA values
								rewardBMP.bitmap.filters = [cFilter]; //applying filter
							}
							else if(grid[i][j].rgbColor == "green"){
								cFilter = new createjs.ColorFilter(0.9, 2, 0.9, 1);
								rewardBMP.bitmap.filters = [cFilter];
							}
							else if(grid[i][j].rgbColor == "purple"){
								cFilter = new createjs.ColorFilter(2, 0.2, 0.7, 1);
								rewardBMP.bitmap.filters = [cFilter];
							}
							else if(grid[i][j].rgbColor == "yellow"){
								cFilter = new createjs.ColorFilter(2, 1.5, 0.7, 1);
								rewardBMP.bitmap.filters = [cFilter];
							}
							else if(grid[i][j].rgbColor == "blue"){
								cFilter = new createjs.ColorFilter(0.9, 0.9, 2, 1);
								rewardBMP.bitmap.filters = [cFilter];
							}
						//}
						
						rewardImages.push(rewardBMP);
						scenes[currScene].stage.addChild(rewardBMP.bitmap);
						rewardBMP.bitmap.updateCache(); //update to add colorFilter

						}
					}
				}
			}
	}



})();