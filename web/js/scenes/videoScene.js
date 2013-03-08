//
// An example scene that allows for video playback
//
var videoScene = (function() {
	//var input;
	var scene;

	return {
		// Engine will soon be changing - 
		// So that scenes 'init' method will no longer take any arguments
		// but we have to leave it for now
		init: function(paramNotActuallyNeeded) {

			console.log("init: videoScene");
			scene = this;

			for(var i = 0; i < this.scene.visuals.length ; i ++)
			{
				this.scene.visuals[i].bitmap.alpha = 1;
				this.scene.stage.removeChild(this.scene.visuals[i].bitmap);
				this.scene.stage.addChild(this.scene.visuals[i].bitmap);
			}

			// Video Player Code
			
			// Set the scene for the video manager
			VideoManager.scene = scene;

			// Load the specific video you want to play
			var video = VideoManager.load(	// Video Id
							"test", 
							// Function that is called when playback is finished
							function() { 
								console.log("Video playback finished");
							});

			// Position the video in the scene
			scene.stage.addChild(video);

			// Use the video manager to play the video
			VideoManager.play();

			// add a handler for all the events we're interested in
			// in this case we can use left and right arrows to play
			document.onkeydown = handleKeyDown;

			//make sure all the assets are visible
			for(var i = 0 ; i < this.visuals.length ; i++)
			{
				scene.visuals[i].visible = true;
			}
		},

		// No update specfic stuff required for videos
		update: function() {
			//update scene
			scene.stage.update();
		},

		// We always have a finalise method so we know when the scene has ended
		finalize: function() {
			for(var i = 0 ; i < this.visuals.length ; i++)
			{
				scene.visuals[i].visible = false;
			}
		}
	};

	function handleKeyDown(evt) {
		// You may want keyboard controls
		if (evt.keyIdentifier=="Left") { VideoManager.play(); } 
		if (evt.keyIdentifier=="Right") { VideoManager.pause(); }
	};

})();
