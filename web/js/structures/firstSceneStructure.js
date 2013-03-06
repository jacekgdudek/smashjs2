console.log("Loading first scene structure");

var firstSceneStructure = {
	_name: "welcome",
	init: defaultScene.init,
	update: defaultScene.update,
	finalize: defaultScene.finalize,
	isCurrent: true,
	noGUI: true,
	stage_id: "game_canvas",
	visuals: [
		{
		  src: "assets/bg/bg.jpg",
		  name: "bkg"
		},
		{
			x:200,
			y:400,
		  src: "assets/button/play.png",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "START_NEW_GAME"
			}	
		},
		{
			x:400,
			y:400,
		  src: "assets/button/play.png",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "CONTINUE_GAME"
			}	
		},
		{
			x:400,
			y:300,
			src: "assets/button/play.png",
			name: "btn_play",
			hasDown: true,
			downEvent: {
				type: "SWITCH_SCENE",
				content: "video_scene"
			}	
		},
		{
			x:600,
			y:300,
			src: "assets/button/play.png",
			name: "btn_play",
			hasDown: true,
			downEvent: {
				type: "SWITCH_SCENE",
				content: "settings"
			}	
		}
	]
};
