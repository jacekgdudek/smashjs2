var rewardSceneStructure = {
	_name: "reward_scene",
	init: rewardScene.init,
	update: rewardScene.update,
	finalize: rewardScene.finalize,
	isCurrent: true,
	stage_id: "game_canvas",
	rewardGrid:{
		width: 6,
		height: 3,
		},
	rewards: [
		{
			visualId: 3,
			value: 400
		},
		{
			visualId: 4,
			value: 400
		},
		{
			visualId: 4,
			value: 200,
			rgbColor: "red"
		},
		{
			visualId: 4,
			value: 400,
			rgbColor: "green"
		},
		{
			visualId: 4,
			value: 500,
			rgbColor: "blue"
		}
	],
	visuals: [
		{
		  src: "assets/base/base_bkg2.jpg",
		  name: "bkg"
		},
		{
			x:0,
			y:0,
		  src: "assets/reward/interior.jpg",
		  name: "btn_play"
		},
		{
			x:400,
			y:500,
			src: "assets/button/back_btn.jpg",
			name: "btn_play",
			hasDown: true,
			downEvent: {
				type: "SWITCH_SCENE",
				content: "base_scene"
			}	
		},
		{
			x: 0,
			y: 0,
		  src: "assets/reward/ring.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
			x: 0,
			y: 0,
		  src: "assets/reward/watch.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
			x: 0,
			y: 0,
		  src: "assets/reward/cash.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		}
	]
};
