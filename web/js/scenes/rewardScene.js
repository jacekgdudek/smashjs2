function RewardScene(){
	this.rewardImages = new Array();
	this._rewards = new Array();
}

RewardScene.prototype = new Scene(rewardSceneStructure);

RewardScene.prototype.init = function() {
	Scene.prototype.init.call(this);
	console.log("init: reward scene");

	//set ui
	setGUI();

	//make sure all the assets are visible
	visuals = this.structure.visuals;
	for(var i = 0 ; i < visuals.length ; i++)
	{
		if(visuals[i].visible != false)
			visuals[i].bitmap.visible = true;
	}

	//--------initialize grid
	this.grid = new Array(this.structure.rewardGrid.width);
	for (var i = 0; i < this.structure.rewardGrid.width; i++) {
		this.grid[i] = new Array(this.structure.rewardGrid.height);
		for (var j = 0; j < this.structure.rewardGrid.height; j++) {
			var rewardObject = new Object();
			rewardObject.visualId = -1;
			this.grid[i][j] = rewardObject;
		}
	}

	this.randObjects(	/*reward value*/currentJob.reward,
				_rewards);

	this.repositionObjects();

	// add a handler for all the events we're interested in
	//this.scene.stage.onTick = update;
	document.onkeydown = this.handleKeyDown;

	this.stage.onMouseDown = function(mousePos) {
			//---------------------------mouse down on reward
			for(var i = 0 ; i < _rewards.length ; i++) {
				if(	this.rewardImages[i].hasDown && 
					this.rewardImages[i].bitmap.visible &&
					this.rewardImages[i].bitmap.hitTest(mousePos.stageX - this.rewardImages[i].bitmap.x, mousePos.stageY - this.rewardImages[i].bitmap.y )) {

					if (this.rewardImages[i].downEvent.type == "SPECIAL_REWARD_BUTTON_DOWN") { 
						addEvent(this.rewardImages[i].downEvent.type, this.rewardImages[i].downEvent.content);
					} else {
						addEvent(this.rewardImages[i].downEvent.type, _rewards[i].value);
					}
					this.rewardImages[i].bitmap.visible = false;
					console.log("down state on reward initialized");
				}
			}

			for(var i = 0 ; i < visuals.length ; i++) {
				// Check if we should add events on any of the visuals
				if(	visuals[i].hasDown &&
					visuals[i].bitmap.hitTest(mousePos.stageX - visuals[i].bitmap.x, mousePos.stageY - visuals[i].bitmap.y )) &&
					visuals[i].downEvent.type != "ADD_CREDITS") {

					addEventEx(visuals[i].downEvent);
					console.log("down state initialized");
				}
			}
		}
	}
}

RewardScene.prototype.finalize = function() {
	Scene.prototype.finalize.call(this);
	for(var i = 0 ; i < this.rewardImages.length ; i++)
	{
		this.rewardImages[i].bitmap.visible = false;
		this.stage.removeChild(this.rewardImages[i]);
	}
	this.rewardImages = new Array();
	this._rewards = new Array();
	hideGUI();
}

RewardScene.prototype.randObjects = function(rewardLevel, rewards) {
	possibleRewards = this.structure.rewards;

	var rewardValue = rewardLevel * 1000;

	//------------------------randomise rewards
	var finished = false;
	while(!finished)
	{
		rewardId = Math.floor(Math.random()*possibleRewards.length);

		if(possibleRewards[rewardId].value > rewardValue){
			finished = true;
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
		finished = false;
		while(!finished)
		{
			finished = true;
			rewardId = Math.floor(Math.random()*specialRewards.rewards.length);

			for(var i = 0 ; i < currSpecialRewards.length ; i ++)
			{
				if(currSpecialRewards[i] == rewardId) finished = false;
			}

			if(finished)
			{
				specialRewards.rewards[rewardId].visualId = -2;
				rewards.push(specialRewards.rewards[rewardId]);
			}
		}	
	}

	//----------------------randomise positions
	for ( var i = 0 ; i < rewards.length ; i++)
	{
		var foundSpot = false;
		while(!foundSpot)
		{
			x = Math.floor(Math.random()*this.grid.length);
			y = Math.floor(Math.random()*this.grid[0].length);
			if(this.grid[x][y].visualId == -1)
			{
				foundSpot = true;
				this.grid[x][y] = rewards[i];
			}
		}
	}

}

RewardScene.prototype.repositionObjects = function () {
	// convienence shorthand for grid
	grid = this.grid;
	// Traverse the grid
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {

			// You've won a prize
			if(grid[i][j].visualId != -1) {
				//special prize
				if(grid[i][j].visualId == -2) {
					var rewardBMP  = new Object();
					rewardBMP.hasDown = true;
					rewardBMP.downEvent = specialRewards.rewards[grid[i][j].contentId].downEvent;
					rewardBMP.bitmap =  specialRewards.rewards[grid[i][j].contentId].thumbnail.clone();//new createjs.Bitmap(this.visuals[grid[i][j]].src);
					rewardBMP.bitmap.x = 100+i * 100;
					rewardBMP.bitmap.y = 100+j * 100;
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
					
					this.rewardImages.push(rewardBMP);
					this.stage.addChild(rewardBMP.bitmap);

				//regular prize
				} else {
					console.log("Reward visualId : " + grid[i][j].visualId);
					var rewardBMP  = new Object();
					rewardBMP.hasDown = true;
					rewardBMP.downEvent = this.visuals[grid[i][j].visualId].downEvent;
					rewardBMP.bitmap =  this.visuals[grid[i][j].visualId].bitmap.clone();//new createjs.Bitmap(scenes[currScene].visuals[grid[i][j]].src);
					rewardBMP.bitmap.x = i * 100;
					rewardBMP.bitmap.y = j * 100;
					rewardBMP.bitmap.visible = true;
					console.log("putting object on x:" + i*100 + " y : " + j*100);
					
					rewardBMP.bitmap.cache(0, 0, rewardBMP.bitmap.image.width, rewardBMP.bitmap.image.height);
					/*var cFilter;
					cFilter = new createjs.ColorFilter(0, 1, 0, 1);
					rewardBMP.bitmap.filters = [cFilter];
					*/
					if (grid[i][j].visualId == 4){
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
						else if(grid[i][j].rgbColor == "blue"){
							cFilter = new createjs.ColorFilter(0.9, 0.9, 2, 1);
							rewardBMP.bitmap.filters = [cFilter];
						}
					}
					
					this.rewardImages.push(rewardBMP);
					this.stage.addChild(rewardBMP.bitmap);
					rewardBMP.bitmap.updateCache(); //update to add colorFilter

				}
			}
		}
	}
}



