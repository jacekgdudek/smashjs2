var citySceneStructure = {
	_name: "map_scene",
	init: cityScene.init,
	update: cityScene.update,
	finalize: cityScene.finalize,
	stage_id: "game_canvas",
	catSrc: "assets/city_map/cat.jpg",
	cityPointerSrc: "assets/city_map/cat.jpg",
	cityPointerRect:
	{
		x: 0,
		y: 0,
		width: 320,
		height: 240
		},
	visuals: [
		{
		  src: "assets/base/desk_base.jpg",
		  name: "bkg"
		},
		{
		  src: "assets/map/euromap_full.png",
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
			x:800,
			y:80,
			src: "assets/city_map/paperslip.png",
			name: "btn_play"
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


