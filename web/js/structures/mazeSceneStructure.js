console.log("Loading maze scene structure");

var mazeSceneStructure = {
	_name: "maze_scene",
	init: mazeScene.init,
	update: mazeScene.update,
	finalize: mazeScene.finalize,
	isCurrent: true,
	stage_id: "game_canvas",
	visuals: [
		{
		  src: "assets/bg/bg.jpg",
		  name: "bkg"
		},
		{
			x:0,
			y:0,
		  	src: "assets/maze/maze1.png",
		  	name: "maze"
		},
		{
			x:0,
			y:0,
		  src: "assets/maze/startpoint.png",
		  name: "btn_play"
		},
		{
			x:400,
			y:300,
			src: "assets/maze/burger.png",
			name: "burger"	
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
