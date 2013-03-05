var jobSceneStructure = {
	_name: "job_board_scene",
	init: jobsScene.init,
	update: jobsScene.update,
	finalize: jobsScene.finalize,
	isCurrent: true,
	stage_id: "game_canvas",
	catSrc: "assets/city_map/cat.jpg",
	jobPointerSrc: "assets/city_map/cat.jpg",
	jobPointerRect:
	{
		x: 0,
		y: 0,
		width: 320,
		height: 240
		},
	visuals: [
		{
		  src: "assets/base/base_bkg2.jpg",
		  name: "bkg"
		},
		{
			x:20,
			y:20,
		  src: "assets/city_map/city_map.jpg",
		  name: "btn_play"
		},
		{
			x: 600,
			y: 500,
		  src: "assets/button/back_btn.jpg",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "SWITCH_SCENE",
			content: "base_scene"
			}	
		},
		{
			x:40,
			y:600,
			src: "assets/city_map/card.jpg",
			name: "btn_play",
			hasDown: true,
			downEvent: {
				type: "SWITCH_SCENE",
				content: "combination_lock"
				}	
			},
		{
			x: 600,
			y: 500,
		  src: "assets/button/back_btn.jpg",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "SWITCH_SCENE",
			content: "base_scene"
			}	
		}
	]
};
