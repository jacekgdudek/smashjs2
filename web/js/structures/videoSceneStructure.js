var videoSceneStructure = {
	_name: "video_scene",
	init: videoScene.init,
	update: videoScene.update,
	stage_id: "game_canvas",
	visuals: [
		{
		  src: "assets/combination/safe_bg.jpg",
		  name: "bkg"
		}
	],
	videos: [
		{
		  src: "assets/video/sample_mpeg4.mp4",
		  name: "test"
		}
	]
};
