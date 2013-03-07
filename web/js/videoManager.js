/* 
 * This class constitutes the video playing component of game engine
 *
 * 
 * See scenes/videoScene.js for an example usage of the class
 *
 */
var VideoManager = new function() {

	// Videos with a specific id can be loaded
	//
	// id			- represents the id of the video in the structure file
	//
	// returns 		: easel.js object (or false if it doesnt exist)
	//
	this.load = function(id) {

		if (!this.hasOwnProperty("scene")) {
			console.log("You need to set the VideoManager.scene before you can play a video");
			return false;
		}

		var played = false;
		// If there are videos
		if (this.scene.hasOwnProperty("videos")) {

			// Play the video with the correct id
			for (var i = 0; i < this.scene.videos.length; i++) {
				if (this.scene.videos[i].id == id) {
					VideoManager.player = document.getElementById("videoPlayer");
					VideoManager.player.src = this.scene.videos[i].src;
					VideoManager.player.load();
					played = true;

					// Add the ended event from the structure if there is one
					if (this.scene.videos[i].hasOwnProperty("endedEvent")) {
						var endedEvent = this.scene.videos[i].endedEvent;
						// Ended event using JQuery
						$('#videoPlayer').bind("ended", function() {
							addEventEx(endedEvent);
						});
					}

					// Return an easel bitmap
					var bitmap =  new createjs.Bitmap (VideoManager.player);
					return bitmap;
				}
			}
		} 
		console.log("Video with id: %s could not be played", id);
		return false;
	};

	// We also offer playback controls
	this.play = function() {
		VideoManager.player.play();
	};
	this.pause = function() {
		VideoManager.player.pause();
	};
};
