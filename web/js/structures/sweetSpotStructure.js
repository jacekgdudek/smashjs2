var sweetSpotStructure = {
	_name: "sweet_spot",
	init: sweetSpot.init,
	update: sweetSpot.update,
	stage_id: "game_canvas",
	visuals: [
		{
		  src: "assets/bg/bg.jpg",
		  name: "bkg"
		},
		{
		  src: "assets/player/knob.png",
		  name: "knob",
		  player_id: 0,
		  hitClass: "collider101"
		},
		{
		  src: "assets/player/stethoscope.png",
		  name: "stethoscope",
		  player_id: 2,
		  hitClass: "collidee101"
		}
	],
	collisions: [
		{
		collider: "collider101",
		collidee: "collidee101",
		event: {
			type: "SWITCH_SCENE",
			content: "sweet_spot"
			}	
		}
	]
};
