
var loadedAssets = false;

function SmashAndGrabPreLoader() {

	//var srcFiles = new Array();
	var loadCounter = 0;
	var queue;
	var postManifest;

	//preload content
	var preloadStage, bkg;
	var preloadBar, preloadKnob;
	var lastUpdate;

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

		lastUpdate = new Date().getTime() / 1000;

	}

	this.setupLoaderGraphics = function(preload) {
		//preload stage
		preloadStage = new createjs.Stage(preload.stage_id);

		//load graphics
		bkg = new createjs.Bitmap(preload.bgsrc);
		preloadStage.addChild( bkg );

		//bar
		if(typeof preload.bar !== 'undefined')
		{
			preloadBar = preload.bar;
			preloadBar.bar = new createjs.Shape();
			preloadStage.addChild( preloadBar.bar );
		}
		//knob
		if(typeof preload.knob !== 'undefined')
		{
			preloadKnob = new Object();
			preloadKnob.bg = new createjs.Bitmap(preload.knob.src);
			preloadKnob.knob = new createjs.Bitmap(preload.knob.src2);

			//position and scale
			preloadKnob.bg.regX = 117;
			preloadKnob.bg.regY = 117;

			preloadKnob.knob.regX = 117;
			preloadKnob.knob.regY = 117;

			preloadKnob.bg.scaleX = 2;
			preloadKnob.bg.scaleY = 2;

			preloadKnob.knob.scaleX = 2;
			preloadKnob.knob.scaleY = 2;

			preloadKnob.bg.x = 400;
			preloadKnob.bg.y = 300;

			preloadKnob.knob.x = 400;
			preloadKnob.knob.y = 300;

			preloadKnob.knob.rotation = preload.knob.offset_angle;
			preloadKnob.offset_angle = preload.knob.offset_angle;

			preloadStage.addChild( preloadKnob.bg, preloadKnob.knob );
		}
		
		preloadStage.update();

	}

	this.handleProgress = function(event) {

		console.log("Loading assets " + (queue.progress.toFixed(2) * 100) + "%");
		if(typeof preloadBar !== 'undefined')
		{
			preloadStage.removeChild( preloadBar.bar);
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
		}
		if(typeof preloadKnob !== 'undefined')
		{
			var angle = (360/100) * (queue.progress.toFixed(2) * 100) + preloadKnob.offset_angle;
			preloadKnob.knob.rotation = angle;
		}
		
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
