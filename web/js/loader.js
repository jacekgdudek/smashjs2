
var loadedAssets = false;

function SmashAndGrabPreLoader() {

	//var srcFiles = new Array();
	var loadCounter = 0;
	var queue;
	var postManifest;

	//preload content
	var preloadStage, bkg;
	var preloadBar = new Object();

	this.loadContent = function(gamejson) {

		this.setupLoaderGraphics(gamejson.preload);

		//init queue
		queue = new createjs.LoadQueue();
		queue.installPlugin(createjs.SoundJS);
		queue.addEventListener("complete", this.preLoadingComplete);
		queue.onProgress = this.handleProgress;

		// For each scene
		var scenes = gamejson.game.scenes;
		for (var i = 0; i < scenes.length; i++) {

			// Load the visuals
			var visuals = scenes[i].visuals;
			for (var j = 0; j < visuals.length; j++) {
				queue.loadFile(visuals[j].src);
				loadCounter++;
			}
		}
		//add audio manifests
		queue.loadManifest(gamejson.game.audio[0].pre_manifest);
		postManifest = gamejson.game.audio[0].post_manifest;

	}

	this.setupLoaderGraphics = function(preload) {
		//preload stage
		preloadStage = new createjs.Stage(preload.stage_id);

		//load graphics
		bkg = new createjs.Bitmap(preload.bgsrc);
		preloadBar = preload.bar;
		preloadBar.bar = new createjs.Shape();
		preloadStage.addChild( bkg, preloadBar.bar );
		preloadStage.update();

	}

	this.handleProgress = function(event) {

		console.log("Loading assets " + (queue.progress.toFixed(2) * 100) + "%");
		console.log("width : " + (preloadBar.width * queue.progress.toFixed(2)));
		preloadStage.removeChild( preloadBar.bar );
		preloadBar.bar = new createjs.Shape();
		preloadBar.bar.graphics		.beginLinearGradientFill(	[preloadBar.color,preloadBar.color,preloadBar.color,preloadBar.color], 
										[0,0.3,0.6, 1], 
										0, 
										0, 
										0, 
										20)
						.drawRect(	preloadBar.x, 
								preloadBar.y, 
								(preloadBar.width * queue.progress.toFixed(2)), 
								preloadBar.height);

		preloadStage.addChild( preloadBar.bar );
		preloadStage.update();
	};

	this.preLoadingComplete = function() {
		if(!loadedAssets)
		{
			//start loading background music
			queue.onProgress = this.handlePostLoadingProgress;
			queue.onComplete = this.postLoadingComplete;
			queue.loadManifest(postManifest, true);

			console.log("FINNISHED LOADING!!!!!!!!!!!!!!!!! ----> "+loadCounter+" files in ");
			loadedAssets = true;
		}
	};

	this.handlePostLoadingProgress = function() {

		console.log("PostLoading assets " + (queue.progress.toFixed(2) * 100) + "%");

	};

	this.postLoadingComplete = function() {

		console.log("LOADED POST ASSETS !!!!!");

	};
}
