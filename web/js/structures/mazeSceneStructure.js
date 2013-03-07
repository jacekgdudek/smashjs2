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
		  src: "assets/maze/bottom.png",
		  name: "bkg"
		},
		{
			x:0,
			y:0,
		  	src: "assets/maze/maze1.png",
		  	name: "maze"
		},
		{
			x:40,
			y:40,
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
		  src: "assets/maze/bg.png",
		  name: "bkg"
		}
	]
};
