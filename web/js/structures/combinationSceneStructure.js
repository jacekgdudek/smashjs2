var combinationSceneStructure = {
	_name: "combination_lock",
	hasGUI: true,
	stage_id: "game_canvas",
	sweet_spot:
	{
		x: 200,
		y: 200
	},
	visuals: [
		{
		  src: "assets/combination/safe_bg.jpg",
		  name: "bg"
		},
		{
		  src: "assets/combination/dial_base.png",
		  name: "knob"
		},
		{
		  src: "assets/combination/dial_numbers.png",
		  name: "numbers",
		  maxNumber: 20
		},
		{
		  src: "assets/combination/stethoscope_2.png",
		  name: "stethoscope"
		}
	]
}
