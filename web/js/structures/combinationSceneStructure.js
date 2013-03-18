var combinationSceneStructure = {
	_name: "combination_lock",
	init: combinationScene.init,
	update: combinationScene.update,
	finalize: combinationScene.finalize,
	stage_id: "game_canvas",
	sweet_spot:
	{
		x: 200,
		y: 200
	},
	visuals: [
		{
		  src: "assets/combination/door.png",
		  name: "bg"
		},
		{
		  src: "assets/combination/knob.png",
		  name: "knob"
		},
		{
		  src: "assets/combination/numbers_0_12.png",
		  name: "numbers",
		  maxNumber: 13,
		  span: 260,
		  offset: 130 
		},
		{

		  src: "assets/combination/stethoscope_2.png",
		  name: "stethoscope"
		},
		{
		  src: "assets/combination/indicator_bg.png",
		  name: "stethoscope",
		  y: 300,
		  x: 400
		},
		{
		  src: "assets/combination/indicator_pointer.png",
		  name: "stethoscope",
		  startAngle: -60,
		  finnishAngle: 60,
		  widthAngle: 10,
		  regX: 100,
		  regY: 100,
		  refY: 300,
		  refX: 400,
		  y: -300,
		  x: -400
		},
		{
		  src: "assets/combination/handle.png",
		  name: "handle",
		  regX: 162.5,
		  regY: 162.5,
		  y: 300,
		  x: 510
		}
	]
}
