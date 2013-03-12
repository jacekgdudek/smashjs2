console.log("Loading audio structure");

var audioAssetsPath = "assets/audio/";

var audioContent = {
	pre_manifest: [
		{
			src: audioAssetsPath + "click0.mp3|" + audioAssetsPath + "click.mp3",
			id: audioManagerAudioObject.NORMAL_CLICK,
			data: 1
		}, 
		{
			src: audioAssetsPath + "click0.mp3|" + audioAssetsPath + "click.mp3",
			id: audioManagerAudioObject.SPECIAL_CLICK,
			data: 1
		},
		{
			src: audioAssetsPath + "paper1.mp3",
			id: audioManagerAudioObject.PAPER_EFFECT,
			data: 1
		}
	],
	post_manifest: [
		{
			src: audioAssetsPath + "city1.mp3|" + audioAssetsPath + "city1.mp3",
			id: audioManagerAudioObject.BACKGROUND_MUSIC,
			data: 1
		}
	]		
};
