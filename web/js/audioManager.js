// Smash And Grab Audio Manager js : v0.01a : James Nesfield for Peekabu Feb 2013


var audioManagerAudioObject = {
'NORMAL_CLICK':1,
'SPECIAL_CLICK':2,
'BACKGROUND_MUSIC':3
};


function SmashAndGrabAudioManager(){

		var successfulLoadBool = true;
		var preload;
		var assetsPath = "assets/audio/";
		var verboseDebugging = false;
		var clickVolume = 1.0;
		var clickInstance;
	
	//INIT======================================

    		createjs.FlashPlugin.BASE_PATH = "./soundjs/" // Initialize the base path from this document to the Flash Plugin
    		 createjs.SoundJS.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
		if (!createjs.SoundJS.checkPlugin(true)) {
			document.getElementById("error").style.display = "block";
			document.getElementById("content").style.display = "none";
			successfulLoadBool = false;
			return;
		};
		
		
		
		var manifest = [
		    {src:assetsPath+"clickA.wav|"+assetsPath+"click.wav", id:audioManagerAudioObject.NORMAL_CLICK, data: 1},
		    {src:assetsPath+"clickA.wav|"+assetsPath+"click.wav", id:audioManagerAudioObject.SPECIAL_CLICK, data: 1}
		];
		
		
		//preloadQueue = new createjs.PreloadJS();		
		preloadQueue = new createjs.LoadQueue();
	    preloadQueue.installPlugin(createjs.SoundJS);
	    preloadQueue.onProgress = handleProgress;
		preloadQueue.onComplete = loadingComplete;		
	    preloadQueue.loadManifest(manifest, true);

	

	
	
	//PRELOAD JS CALLBACK METHODS======================================

	function handleProgress(event) {
		//displayStatus.innerText = "Loading: " + (queue.progress.toFixed(4) * 100) + "%";
		console.log("Loading audio assets " + (preloadQueue.progress.toFixed(2) * 100) + "%");
	};
	
		function loadingComplete(){
	if(verboseDebugging){
				successfulLoadBool?
	console.log("Smash and Grab audio manager successfully initiated and loaded assets"):
	console.log(" ERROR : could not load Smash and Grab Audio Manager!");
	};
	};
	

	//SOUND PLAYBACK METHODS
	this.playSound = function(name){
		if(verboseDebugging){console.log('Smash And Grab Audio Manager is playing sound :\''+name+'\'')};
		
		clickInstance = createjs.SoundJS.play(name);
		clickInstance.setVolume(clickVolume);

	};

	
	this.stopSound = function(){
		if (preloadQueue != null) { preloadQueue.cancel(); }
		createjs.SoundJS.stop();
	}
	
	
	
	this.setVolume = function(volume,id){
		if(volume >= 0.0 && volume <= 1.0){
			switch (id){
			case audioManagerAudioObject.NORMAL_CLICK:
			clickVolume = volume;
			break;
				case audioManagerAudioObject.SPECIAL_CLICK:
				///TODO:
			break;
				case audioManagerAudioObject.BACKGROUND_MUSIC:
								///TODO:

			break;
			default:
			console.log('warning : attempt to set volume on invalid Audio Manager audio object');
			
			}
		}else{
			console.log('warning : attempting to set Audio Manager volume beyond 0 - 1 limits');
		}
	}
	
	//UTILITY
	this.description = function() {
			console.log('Smash And Grab Audio Manager v0.01a');
    };

	this.verbose = function(bl) {
			verboseDebugging = bl;
    };	
	
	
	
	
}
