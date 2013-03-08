// Smash And Grab Audio Manager js : v0.01a : James Nesfield for Peekabu Feb 2013
var audioManagerAudioObject = {
	'NORMAL_CLICK': 1,
	'SPECIAL_CLICK': 2,
	'BACKGROUND_MUSIC': 3
};



function SmashAndGrabAudioManager() {
	var progress = 0.0;
	var assetsPath = "assets/audio/";
	var clickVolume = 1.0;
	var backgroundPlayer;
	var backgroundPlayerLevel;
	var effectsPlayer;
	var effectsPlayerLevel;
	
	//INIT======================================
	createjs.FlashPlugin.BASE_PATH = "./soundjs/" // Initialize the base path from this document to the Flash Plugin
	createjs.SoundJS.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	if (!createjs.SoundJS.checkPlugin(true)) {
		document.getElementById("error").style.display = "block";
		document.getElementById("content").style.display = "none";
		return;
	};

    backgroundPlayer = createjs.SoundJS;
    effectsPlayer = createjs.SoundJS;
	
	//SOUND PLAYBACK METHODS
	this.playSound = function(name) {
		if (verboseDebugging) {
			console.log('Smash And Grab Audio Manager is playing sound :\'' + name + '\'')
		};
		var audioPlayerInstance = createjs.SoundJS.play(name);
	};
	
	this.stopSound = function() {
		if (preloadQueue != null) {
			preloadQueue.cancel();
		}
		createjs.SoundJS.stop();
	}
	
	this.setVolume = function(volume, id) {
		if (volume >= 0.0 && volume <= 1.0) {
		if(id == audioManagerAudioObject.BACKGROUND_MUSIC){
						backgroundPlayerLevel=volume;
						backgroundPlayer.setVolume(volume, id);
						}else{
						effectsPlayerLevel=volume;
						}
		} else {
			console.log('warning : attempting to set Audio Manager volume beyond 0 - 1 limits');
		}
	}
	

	this.fadeInBackground = function(){
		var volume = 0;
		if(volume <= 1){
			console.log('Smash And Grab Audio Manager is playing sound :\'' + name + '\'')
			backgroundPlayer.setVolume(volume, audioManagerAudioObject.BACKGROUND_MUSIC);
			setTimeout('fadeInBackground(' + (volume + 0.05) + ');',50);
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