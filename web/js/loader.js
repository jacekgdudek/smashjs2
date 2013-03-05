//var srcFiles = new Array();
var loadCounter = 0;
var depth = 0;
var queue;
var loadedAssets = false;

//visuals
var preloadStage;
var preloadBar = new Object();

var timeStamp = 0;

function printTimeStamp() {
	if(verbose)
	{
		var d = new Date();
		var _timeStamp = d.getTime();
		console.log("Time since last stamp" + (timeStamp - _timeStamp));
		timeStamp = _timeStamp;
	}
}

function loadContent(gamejson) {
	setupLoaderGraphics(gamejson.preload);
	printTimeStamp();
	//init queue
	queue = new createjs.LoadQueue();
	queue.addEventListener("complete", loadingComplete);
	queue.onProgress = handleProgress;

	/*
	for(var key in gamejson) {

		loadSubElementContent(gamejson[key]);
	}

	//add to queue
	for(var i = 0 ; i < loadCounter ; i++)
	{
		queue.loadFile(srcFiles[i]);//{id:"sound", src:"http://path/to/sound.mp3"});
	}
	*/

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

}

function setupLoaderGraphics(preload)
{
	//preload stage
	preloadStage = new createjs.Stage(preload.stage_id);

	//load graphics
	var bkg = new createjs.Bitmap(preload.bgsrc);
	preloadBar = preload.bar;
	preloadBar.bar = new createjs.Shape();
	/*
	preloadBar.graphics	.beginLinearGradientFill(	[preload.bar.color,preload.bar.highlight,preload.bar.color,preload.bar.shadow], 
								[0,0.3,0.6, 1], 
								0, 
								0, 
								0, 
								preload.bar.height)
				.drawRect(preload.bar.x, preload.bar.y, 10, preload.bar.height);

	preloadBar.bar.graphics	.beginLinearGradientFill(	[preloadBar.color,preloadBar.color,preloadBar.color,preloadBar.color], 
								[0,0.3,0.6, 1], 
								0, 
								0, 
								0, 
								20)
				.drawRect(	preloadBar.x, 
						preloadBar.y, 
						1, 
						preloadBar.height);
				.beginLinearGradientFill(	[preload.bar.color,preload.bar.highlight,preload.bar.color,preload.bar.shadow], 
								preload.bar.ratio, 
								0, 
								0, 
								0, 
								preload.bar.height)
				.drawRect(preload.bar.x, preload.bar.y, 0, preload.bar.height);
	*/

	preloadStage.addChild( bkg, preloadBar.bar );
	preloadStage.update();

}

function handleProgress(event) {
	//displayStatus.innerText = "Loading: " + (queue.progress.toFixed(4) * 100) + "%";
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
					/*
  					.beginLinearGradientFill(	["#F66","#FAA","#F66","#D00"], 
									[0,0.3,0.6, 1], 
									0, 
									0, 
									0, 
									20)
					.drawRect(	preloadBar.initX, 
							preloadBar.initY, 
							preloadBar.maxWidth * queue.progress.toFixed(2), 
							preloadBar.maxHeight);*/

	preloadStage.addChild( preloadBar.bar );
	preloadStage.update();
};


function loadingComplete() {
	console.log("FINNISHED LOADING!!!!!!!!!!!!!!!!! ----> "+loadCounter+" files in ");
	loadedAssets = true;
	printTimeStamp();
     //createjs.Sound.play("sound");
     //var image = queue.getResult("myImage");
     //document.body.appendChild(image);
 }
