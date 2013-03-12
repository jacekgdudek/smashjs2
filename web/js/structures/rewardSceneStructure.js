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
			visualId: 4,
			value: 100
		},
		{
			visualId: 9,
			value: 200
		},
		{
			visualId: 5,
			value: 200
		},
		{
			visualId: 10,
			value: 250,
			rgbColor: "red"
		},
		{
			visualId: 13,
			value: 300,
			rgbColor: "red"
		},
		{
			visualId: 3,
			value: 300
		},
		{
			visualId: 12,
			value: 350,
			rgbColor: "yellow"
		},
		{
			visualId: 10,
			value: 350
		},
		{
			visualId: 6,
			value: 400
		},
		{
			visualId: 13,
			value: 400,
			rgbColor: "purple"
		},
		{
			visualId: 12,
			value: 550,
			rgbColor: "red"
		},
		{
			visualId: 12,
			value: 600,
			rgbColor: "blue"
		},
		{
			visualId: 7,
			value: 800
		},
		{
			visualId: 11,
			value: 1000,
			rgbColor: "red"
		},
		{
			visualId: 12,
			value: 1200
		},
		{
			visualId: 11,
			value: 1600
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
				content: "base_scene",
				content2: 1
			}	
		},
		{
		  src: "assets/reward/ring.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
		  src: "assets/reward/watch.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
		  src: "assets/reward/cash_1.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
		  src: "assets/reward/cash_2.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
		  src: "assets/reward/cash_3.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
		  src: "assets/reward/cash_4.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
		  src: "assets/reward/cash_5.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
		  src: "assets/reward/bracelet.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
		  src: "assets/reward/diamonds.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
		  src: "assets/reward/gems.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		},
		{
		  src: "assets/reward/pearls.png",
		  hasDown: true,
		  visible: false,
		  downEvent: {
			type: "ADD_CREDITS"
			}
		}
	]
};
