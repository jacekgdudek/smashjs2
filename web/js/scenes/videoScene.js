//
// An example scene that allows for video playback
//
function VideoScene(){}

VideoScene.prototype = new Scene(videoSceneStructure);

VideoScene.prototype.init = function() {
	Scene.prototype.init.call(this);
	console.log("init: videoScene");

	// Video Player Code
	
	// Set the scene for the video manager
	VideoManager.videos = this.structure.videos;

	// Load the specific video you want to play
	var video = VideoManager.load("test");

	// Position the video in the scene
	this.stage.addChild(video);

	// Use the video manager to play the video
	VideoManager.play();
}

VideoScene.prototype.handleKeyDown = function(evt) {
	// For now we use keyboard controls for control
	if (evt.keyIdentifier=="Left") { VideoManager.player.play(); } 
	if (evt.keyIdentifier=="Right") { VideoManager.player.pause(); } 
}

