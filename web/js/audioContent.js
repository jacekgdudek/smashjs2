console.log("Loading audio structure");

var audioAssetsPath = "assets/audio/";

var audioContent = {
	pre_manifest: [
		{
			src: audioAssetsPath + "click1.wav|" + audioAssetsPath + "click.wav",
			id: audioManagerAudioObject.NORMAL_CLICK,
			data: 1
		}, 
		{
			src: audioAssetsPath + "click1.wav|" + audioAssetsPath + "click.wav",
			id: audioManagerAudioObject.SPECIAL_CLICK,
			data: 1
		}
	],
	post_manifest: [
		{
			src: audioAssetsPath + "city.wav|" + audioAssetsPath + "city.wav",
			id: audioManagerAudioObject.BACKGROUND_MUSIC,
			data: 1
		}
	]
};
