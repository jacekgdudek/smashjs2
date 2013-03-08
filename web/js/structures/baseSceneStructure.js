var baseSceneStructure = {
	_name: "base_scene",
	hasGUI: true,
	isCurrent: true,
	stage_id: "game_canvas",
	visuals: [
		{
		  src: "assets/base/base_bkg2.jpg",
		  name: "bkg"
		},
		{
			x: 0,
			y: 20,
		  src: "assets/button/map_button.jpg",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "SWITCH_SCENE",
			content: "map_scene"
			}	
		},
		{
			x:400,
			y:500,
		  src: "assets/button/job_button.jpg",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "SWITCH_SCENE",
			content: "job_board_scene"
			}	
		},
		{
			x:0,
			y:120,
		  src: "assets/button/gallery_button.png",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "SWITCH_SCENE",
			content: "gallery_scene"
			}	
		}
	]
};
