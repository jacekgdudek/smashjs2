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
			id: "test",
			src: "assets/video/Test.mp4"
			endedEvent: {
				type: "SWITCH_SCENE",
				content: "map_scene"
			}	
		}
	]
};
