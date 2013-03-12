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
			y: 100,
		  src: "assets/map/desk_europemap.png",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "SWITCH_SCENE",
			content: "map_scene",
			content2: 0
			}	
		},
		{
			x:80,
			y:60,
		  src: "assets/city_map/desk_citymap.png",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "SWITCH_SCENE",
			content: "job_board_scene",
			content2: 0
			}	
		},
		{
			x:600,
			y:120,
		  src: "assets/gallery/desk_notebook_1.png",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "SWITCH_SCENE",
			content: "gallery_scene",
			content2: 0
			}	
		}
	]
};
