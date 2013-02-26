
var rewardScene = (function() {
	//var input;
	var scene;

	var grid;

	return {
		init: function(scene) {
			console.log("init: reward scene");

			this.scene = scene;

			//make sure all the assets are visible
			for(var i = 0 ; i < scene.visuals.length ; i++)
			{
				scene.visuals[i].visible = true;
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
						/*reward value*/currentJob.reward);

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
				this.scene.visuals[i].bitmap.visible = false;
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
		if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
		if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }
	};

	function randObjects(grid, rewardLevel) {
		var scene = scenes[currScene];
		var possibleRewards = scenes[currScene].rewards;
		var rewards = new Array();

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
						scenes[currScene].visuals[grid[i][j]].bitmap.x = i * 100;
						scenes[currScene].visuals[grid[i][j]].bitmap.y = j * 100;
						scenes[currScene].visuals[grid[i][j]].bitmap.visible = true;
						console.log("putting object on x:" + i*100 + " y : " + j*100 + " id : " + grid[i][j]);
					}
				}
			}
	}



})();