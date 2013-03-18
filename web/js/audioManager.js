// Smash And Grab Audio Manager js : v0.01a : James Nesfield for Peekabu Feb 2013
var audioManagerAudioObject = {
	'NORMAL_CLICK': 1,
	'SPECIAL_CLICK': 2,
	'BACKGROUND_MUSIC': 3,
	'PAPER_EFFECT': 4,
	'BULB_SOUND': 4
};



function SmashAndGrabAudioManager() {
	var progress = 0.0;
	var assetsPath = "assets/audio/";
	var audioPlayer;
	var masterVolume = 0;
	var disabled = false;
	
	//INIT======================================
	createjs.FlashPlugin.BASE_PATH = "./soundjs/" // Initialize the base path from this document to the Flash Plugin
	createjs.SoundJS.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	if (!createjs.SoundJS.checkPlugin(true)) {
		document.getElementById("error").style.display = "block";
		document.getElementById("content").style.display = "none";
		return;
	};

    audioPlayer = createjs.SoundJS;
	
	//SOUND PLAYBACK METHODS
	this.playSoundAtVolume = function(id,volume,loop) {
		if(!disabled)
		{
			console.log('Smash And Grab Audio Manager is playing sound :\'' + id + '\' at volume :'+volume);
			
			//Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
			//var instance = createjs.SoundJS.play(1, cr
			//	eatejs.SoundJS.INTERRUPT_NONE,0,0,false,volume);

			var instance = createjs.SoundJS;
			instance.play(id, createjs.SoundJS.INTERRUPT_NONE,0,0,loop,volume);


		    if(instance.setVolume(volume)){console.log('set volume');}else{
		    console.log('coulnt set volume');
		    };

			if (instance == null || instance.playState == createjs.SoundJS.PLAY_FAILED) { 
		    		console.log("error: audio play request failed");
		    		return; 
		    }

		}


	};
	
	
	this.setVolumeForID = function(id,volume) {
		audioPlayer.setVolume(id,volume);
	}
	
	
	this.getMute = function(){
		return disabled;
	}

	this.toggleMute = function(){
		disabled = !disabled;
		console.log("audio manager MUTED : " + disabled);
	}
	
	this.mute = function() {
		//audioPlayer.setMute(true);
	}
	
	this.unmute = function() {
		//console.log("audio player unmuted");
		//audioPlayer.setMute(0);
		//console.log(audioPlayer.getMute()?'i unmuted':'i muted');

	}
	
	this.setAudioManagerVolume = function(volume, id) {
		if (volume >= 0.0 && volume <= 1.0) {
			audioPlayer.setVolume((masterVolume/100)*volume);
		} else {
			console.log('warning : attempting to set Audio Manager volume beyond 0 - 1 limits');
		}
	}
	
	


	function FadeIn(id) {

    var vol = masterVolume;

    if ( vol < 100 )
        {
            audioPlayer.setVolume((vol / 100),id);
            masterVolume = masterVolume + 1;
            console.log('masterVolume : '+(vol / 100));
            setTimeout(function(){FadeIn(id)},100);
        }
    }

    


	/*
var fadeInBackground  = function(volume){
		var volume = 0;
		if(volume <= 1){
			console.log('volume :\'' + volume + '\'')
			audioPlayer.setVolume(volume, audioManagerAudioObject.BACKGROUND_MUSIC);
			setTimeout('fadeIn(' + (volume + 0.05) + ');',50);
		}
	}

*/
	//UTILITY
	this.description = function() {
		console.log('Smash And Grab Audio Manager v0.01a');
	};
	this.verbose = function(bl) {
		verboseDebugging = bl;
	};
}