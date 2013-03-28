var jobSceneStructure = {
	_name: "job_board_scene",
	init: jobsScene.init,
	update: jobsScene.update,
	finalize: jobsScene.finalize,
	isCurrent: true,
	stage_id: "game_canvas",
	catSrc: "assets/city_map/cat.jpg",
	jobPointerSrc: "assets/city_map/safe_icon.png",
	jobPointerRect:
	{
		x: 186,
		y: 181,
		width: 450,
		height: 250
		},
	visuals: [
		{
		  src: "assets/base/desk_base.jpg",
		  name: "bkg"
		},
		{
			x:100,
			y:100,
			
		  src: "assets/city_map/citymap.png",
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
			content: "base_scene",
			content2: 0
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
				content: "combination_lock",
				content2: 0
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
			content: "base_scene",
			content2: 0
			}	
		}
	],
	overlayStructure:{
		x:0,
		y:0,
		src: "assets/bg/shadow2.png",
		pause:  220,
		duration: 265,
		min_value: 0.3,
		soundEffect: audioManagerAudioObject.BULB_SOUND

	}
};
