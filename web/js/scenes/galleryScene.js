
var galleryScene = (function() {
	//var input;
	var scene;

	var grid;

	//rewards
	var rewardId;
	var rewardImages = new Array();
	var rewardClicked;

	return {
		init: function(scene) {
			console.log("init: gallery scene");

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
			grid = new Array(scene.galleryGrid.width);
			for (var i = 0; i < scene.galleryGrid.width; i++) {
				grid[i] = new Array(scene.galleryGrid.height);
				for (var j = 0; j < scene.galleryGrid.height; j++) {
					var rewardObject = new Object();
					rewardObject.contentId = -1;
					grid[i][j] = rewardObject;
				}
			}

			loadThumbnails(/*grid*/ grid);

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

					for(var i = 0 ; i < scene.visuals.length ; i++)
					{
						if(scene.visuals[i].hasDown)
						{
							if(scene.visuals[i].bitmap.hitTest( mousePos.stageX - scene.visuals[i].bitmap.x , mousePos.stageY - scene.visuals[i].bitmap.y ))
							{
								if(scene.visuals[i].downEvent.type != "ADD_CREDITS")
								{
									addEventEx(scene.visuals[i].downEvent);
								}
							}
						}
					}
					for(var i = 0 ; i < rewardImages.length ; i++)
						//react on clicks on rewards
					{
						if(rewardImages[i].img.bitmap.hitTest( mousePos.stageX - rewardImages[i].img.bitmap.x , mousePos.stageY - rewardImages[i].img.bitmap.y ))
						{
								addEvent("SPECIAL_REWARD_BUTTON_DOWN",0, rewardImages[i].contentId);
								//remove rewards from stage to avoid multiplication
							for (var i = 0; i < rewardImages.length; i++){
								scene.stage.removeChild(rewardImages[i].img.bitmap);
							}
								console.log("clicked reward n."+rewardImages[i].contentId);
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
			if(typeof rewardImages[i] !== 'undefined'){
				for(var i = 0 ; i < rewardImages.length ; i++)
				{
					rewardImages[i].img.bitmap.visible = false;
					this.scene.stage.removeChild(rewardImages[i].img.bitmap);
				}
			}
			if (typeof this.scene.messages !== 'undefined') {
				for(var i = 0 ; i < this.scene.messages.length ; i++)
				{
					this.scene.messages[i].bg.visible = false;
					this.scene.messages[i].text.visible = false;
				}
			}
			rewardImages = new Array();
			hideGUI();
			
		},
	};

	function handleKeyDown(evt) {
		// For now we use keyboard controls for the dial
		if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
		if (evt.keyIdentifier=="Right") { this.input.rotation += 10; }
	};

	function loadThumbnails(grid) {
		var scene = scenes[currScene];

		//------------------------getClonesOfThumbnails
		for(var i = 0 ; i < currSpecialRewards.length ; i ++)
		{
			var newThumbnail = new Object();
			newThumbnail.contentId = currSpecialRewards[i];
			rewardImages.push(newThumbnail);
		}

		//----------------------randomize positions
		for ( var i = 0 ; i < rewardImages.length ; i++)
		{
			var foundSpot = false;
			while(!foundSpot)
			{
				x = Math.floor(Math.random()*grid.length);
				y = Math.floor(Math.random()*grid[0].length);
				if(grid[x][y].contentId == -1)
				{
					foundSpot = true;
					grid[x][y] = rewardImages[i];
				}
			}
		}

	}

	function repositionObjects(grid)
	{
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



})();