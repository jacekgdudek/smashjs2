var galleryZoomScene = (function() {
	//var input;
	var scene;

	var grid;

	//rewards
	var rewardId;
	var rewardImages = new Array();
	var imageId;
	var enlargedReward;

	var contentId;
	//video vars
	var video;
	var getVideo;
	var videoPaused;
	var videoOpen;

	return {
		init: function(scene) {

			this.scene = scene;
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
			grid = new Array(scene.galleryZoomGrid.width);
			for (var i = 0; i < scene.galleryZoomGrid.width; i++) {
				grid[i] = new Array(scene.galleryZoomGrid.height);
				for (var j = 0; j < scene.galleryZoomGrid.height; j++) {
					var rewardObject = new Object();
					rewardObject.contentId = -1;
					grid[i][j] = rewardObject;
				}
			}
			loadRewards(grid);

			//showCurrentZoom(grid);
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
			hideGUI();
			
		},
		setImageId:function(imageId) {
			contentId = imageId;
			showCurrentZoom(contentId);
		},
		nextImage:function() {
			if (contentId < currSpecialRewards.length - 1){
			
			scenes[currScene].stage.removeChild(enlargedReward.bitmap);
			contentId++;
			console.log(contentId);
			}
			//also remove Video
			if (videoOpen == true){
			scenes[currScene].stage.removeChild(video);
			videoOpen = false;
			getVideo.pause();
			videoPaused = true;
			console.log("removing VIDEO");
			}
			scenes[currScene].stage.removeChild(enlargedReward.bitmap);
			this.scene.stage.update();
			showCurrentZoom(contentId);
			
		
		},
		previousImage:function() {
			if (contentId >= 1){
			scenes[currScene].stage.removeChild(enlargedReward.bitmap);
			contentId--;
			console.log(contentId);
			}
			//also remove Video
			if (videoOpen == true){
			scenes[currScene].stage.removeChild(video);
			videoOpen = false;
			getVideo.pause();
			videoPaused = true;
			console.log("removing VIDEO");
			}
			scenes[currScene].stage.removeChild(enlargedReward.bitmap);
			this.scene.stage.update();
			showCurrentZoom(contentId);
			
		}
	};

	function loadRewards(grid) {
		var scene = scenes[currScene];

		//------------------------getClonesOfThumbnails
		for(var i = 0 ; i < currSpecialRewards.length ; i ++)
		{
			var newReward = new Object();
			newReward.contentId = currSpecialRewards[i];
			rewardImages.push(newReward);
			grid[x][y] = rewardImages[i];
		}

	}

	function showCurrentZoom(contentId){
	// show enlarged image
			//contentId = 0;
			console.log("You are on n."+contentId);
						enlargedReward  = new Object();
						enlargedReward.hasDown = true;
						enlargedReward.bitmap = specialRewards.rewards[contentId].thumbnail.clone();
						enlargedReward.bitmap.x = 200;
						enlargedReward.bitmap.y = 200;
						enlargedReward.bitmap.scaleX = 2.0;
						enlargedReward.bitmap.scaleY = 2.0;
						enlargedReward.bitmap.visible = true;
						
						scenes[currScene].stage.addChild(enlargedReward.bitmap);
						console.log(enlargedReward.bitmap);

						//Video stuff
						videoOpen = false;
						enlargedReward.bitmap.onPress = function(mouseEvent){
							//check if contentType equals video and if current scene is gallery_zoom_scene
							if (specialRewards.rewards[contentId].contentType == "video"){
								if (currScene == "gallery_zoom_scene"){
									//get ID of the video (video must be included in index.html)
									getVideo = document.getElementById(specialRewards.rewards[contentId].videoId);
									videoPaused = false;
									if(videoOpen == false){
										getVideo.play();
										video = new createjs.Bitmap(getVideo);
										//video position and scale(width,height)
										video.x = 200;
										video.y = 200;
										video.scaleX = 0.7;
										video.scaleY = 0.75;
										scenes[currScene].stage.addChild(video);

										videoOpen = true;
										console.log("openedVideo");
									}
								}
								video.onPress = function(mouseEvent){
									if (currScene == "gallery_zoom_scene"){
										if(videoPaused == false){
											//if video is playing pause on click
											getVideo.pause();
											videoPaused = true;
											console.log("pausedVideo");
										}else if(videoPaused == true){
											//if video is paused play on click
											getVideo.play();
											videoPaused = false;
											console.log("startedVideo");
										}
									}
								}
							}
					}
	}

	})();