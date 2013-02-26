
var rewardScene = (function() {
	//var input;
	var scene;

	var grid;

	//rewards
	var rewardImages = new Array();
	var _rewards = new Array();

	return {
		init: function(scene) {
			console.log("init: reward scene");

			this.scene = scene;

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
					grid[i][j] = -1;
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
						if(rewardImages[i].hasDown)
						{
							if(rewardImages[i].bitmap.hitTest( mousePos.stageX - rewardImages[i].bitmap.x , mousePos.stageY - rewardImages[i].bitmap.y ))
							{
								addEvent(rewardImages[i].downEvent.type, _rewards[i].value);
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
				this.scene.stage.removeChild(rewardImages[i]);
			}
			rewardImages = new Array();
			_rewards = new Array();
			
		},
	};

	function handleKeyDown(evt) {
		// For now we use keyboard controls for the dial
		if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
		if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }
	};

	function randObjects(grid, rewardLevel, rewards) {
		var scene = scenes[currScene];
		var possibleRewards = scenes[currScene].rewards;

		var rewardValue = rewardLevel * 1000;

		//------------------------randomize rewards
		var finnished = false;
		while(!finnished)
		{
			var rewardId = Math.floor(Math.random()*possibleRewards.length);

			if(possibleRewards[rewardId].value > rewardValue){
				finnished = true;
			}
			else
			{
				rewardValue -= possibleRewards[rewardId].value;
				rewards.push(possibleRewards[rewardId]);
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
				if(grid[x][y] == -1)
				{
					foundSpot = true;
					grid[x][y] = rewards[i].visualId;
				}
			}
		}

	}

	function repositionObjects(grid)
	{
		for (var i = 0; i < grid.length; i++) {
				for (var j = 0; j < grid[i].length; j++) {
					if(grid[i][j] != -1)
					{
						console.log("Reward visualId : " + grid[i][j]);
						var rewardBMP  = new Object();
						rewardBMP.hasDown = true;
						rewardBMP.downEvent = scenes[currScene].visuals[grid[i][j]].downEvent;
						rewardBMP.bitmap =  scenes[currScene].visuals[grid[i][j]].bitmap.clone();//new createjs.Bitmap(scenes[currScene].visuals[grid[i][j]].src);
						rewardBMP.bitmap.x = i * 100;
						rewardBMP.bitmap.y = j * 100;
						rewardBMP.bitmap.visible = true;
						console.log("putting object on x:" + i*100 + " y : " + j*100);
						rewardImages.push(rewardBMP);
						scenes[currScene].stage.addChild(rewardBMP.bitmap);
					}
				}
			}
	}



})();