var previewSceneStructure = {
	_name: "preview_scene",
	init: previewScene.init,
	update: previewScene.update,
	finalize: previewScene.finalize,
	stage_id: "game_canvas",
	noGUI: true,
	visuals: [
		{
		  src: "assets/combination/safe_bg.jpg",
		  name: "bkg"
		},
		{
		  src: "assets/combination/dial_base.png",
		  name: "knob"
		},
		{
		  src: "assets/combination/stethoscope_2.png",
		  name: "stethoscope"
		},
		{
			x:600,
			y:500,
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
