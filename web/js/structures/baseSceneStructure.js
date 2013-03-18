var baseSceneStructure = {
	_name: "base_scene",
	init: defaultScene.init,
	update: defaultScene.update,
	finalize: defaultScene.finalize,
	isCurrent: true,
	stage_id: "game_canvas",
	visuals: [
		{
		  src: "assets/base/desk_base.jpg",
		  name: "bkg"
		},
		{
			x: 60,
			y: 200,
		  src: "assets/map/desk_europemap.png",
		  hoverSrc: "assets/map/desk_europemap_highlight.png",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "SWITCH_SCENE",
			content: "map_scene",
			content2: 0
			}	
		},
		{
			x:100,
			y:150,
		  src: "assets/city_map/desk_citymap.png",
		  hoverSrc: "assets/city_map/desk_citymap_highlight.png",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "SWITCH_SCENE",
			content: "job_board_scene",
			content2: 0
			}	
		},
		{
			x:480,
			y:80,
		  src: "assets/gallery/desk_notebook_1.png",
		  hoverSrc: "assets/gallery/desk_notebook_1_highlight.png",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "SWITCH_SCENE",
			content: "gallery_scene",
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

