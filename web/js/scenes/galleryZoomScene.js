var galleryZoomScene = (function() {
	//var input;
	var scene;

	var grid;

	//rewards
	var rewardId;
	var rewardImages = new Array();

	return {
		init: function(scene) {
			console.log("init: gallery scene");

			this.scene = scene;
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

			loadThumbnails(grid,
						rewardImages);
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
				rewardImages[i].img.bitmap.visible = false;
				this.scene.stage.removeChild(rewardImages[i].img.bitmap);
			}
			rewardImages = new Array();
			hideGUI();
			
		},
	};
	})();