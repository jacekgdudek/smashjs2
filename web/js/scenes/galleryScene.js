function GalleryScene() {
	this.rewardImages = new Array();
}
GalleryScene.prototype = new Scene(gallerySceneStructure);

GalleryScene.prototype.init = function() {
	console.log("init: gallery scene");

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
	grid = new Array(this.structure.galleryGrid.width);
	for (var i = 0; i < this.structure.galleryGrid.width; i++) {
		grid[i] = new Array(this.structure.galleryGrid.height);
		for (var j = 0; j < this.structure.galleryGrid.height; j++) {
			var rewardObject = new Object();
			rewardObject.contentId = -1;
			grid[i][j] = rewardObject;
		}
	}

	this.loadThumbnails(/*grid*/ grid, rewardImages);

	this.repositionObjects(grid);

	// add a handler for all the events we're interested in
	//this.scene.stage.onTick = update;
}

GalleryScene.prototype.finalize = function() {
		Scene.prototype.finalize.call(this);
		for(var i = 0 ; i < rewardImages.length ; i++)
		{
			rewardImages[i].img.bitmap.visible = false;
			this.stage.removeChild(rewardImages[i].img.bitmap);
		}
		rewardImages = new Array();
		hideGUI();
}

GalleryScene.prototype.loadThumbnails = function(grid, rewards) {

	//------------------------getClonesOfThumbnails
	for(var i = 0 ; i < currSpecialRewards.length ; i ++)
	{
		var newThumbnail = new Object();
		newThumbnail.contentId = currSpecialRewards[i];
		rewards.push(newThumbnail);
	}

	//----------------------randomize positions
	for ( var i = 0 ; i < rewards.length ; i++)
	{
		var foundSpot = false;
		while(!foundSpot)
		{
			x = Math.floor(Math.random()*grid.length);
			y = Math.floor(Math.random()*grid[0].length);
			if(grid[x][y].contentId == -1)
			{
				foundSpot = true;
				grid[x][y] = rewards[i];
			}
		}
	}
}

GalleryScene.prototype.repositionObjects = function(grid) {
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			if(grid[i][j].contentId != -1)
			{
				var rewardBMP  = new Object();
				rewardBMP.hasDown = true;
				rewardBMP.downEvent = specialRewards.rewards[grid[i][j].contentId].downEvent;
				rewardBMP.bitmap =  specialRewards.rewards[grid[i][j].contentId].thumbnail.clone();//new createjs.Bitmap(scenes[currScene].visuals[grid[i][j]].src);
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
				
				grid[i][j].img = rewardBMP;
				scenes[currScene].stage.addChild(rewardBMP.bitmap);
				//rewardBMP.bitmap.updateCache(); //update to add colorFilter
			}
		}
	}
}

