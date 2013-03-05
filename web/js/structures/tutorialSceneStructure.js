var tutorialSceneStructure = {
	_name: "tutorial_scene",
	init: tutorialScene.init,
	update: tutorialScene.update,
	finalize: tutorialScene.finalize,
	stage_id: "game_canvas",
	nextStageEvent: 
	{
		type: "SWITCH_SCENE",
		content: "welcome"
	},
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
		  maxNumber: 80
		},
		{
		  src: "assets/combination/stethoscope_2.png",
		  name: "stethoscope"
		}
	],
	hints: [
		{
			fid0_disabled: false,
			fid2_disabled: true,
			successCondition: {
				_type: 1,
				_value: 0
			},
			message:"Pick up stethoscope"
		},
		{
			fid0_disabled: false,
			fid2_disabled: false,
			successCondition: {
				_type: 1,
				_value: 2
			},
			message:"Play around with the knob... ?"
		},
		{
			fid0_disabled: false,
			fid2_disabled: false,
			successCondition: {
				_type: 7,
				_value: 20
			},
			message:"Move stethoscope so you can hear the clicks clearly"
		},
		{
			fid0_disabled: false,
			fid2_disabled: false,
			successCondition: {
				_type: 6,
				_value: 60
			},
			message:"I cracked this safe before.. next number is 60"
		},
		{
			fid0_disabled: false,
			fid2_disabled: false,
			successCondition: {
				_type: 4
			},
			message:"Too trigger next number you need to change direction of rotation while you are on the number."
		},
		{
			fid0_disabled: false,
			fid2_disabled: false,
			successCondition: {
				_type: 5,
				_value: 20
			},
			message:"Now try doing it for next number which is 20"
		},
		{
			fid0_disabled: false,
			fid2_disabled: false,
			successCondition: {
				_type: 5,
				_value: 40
			},
			message:"Last one left .. crack the 40"
		}
	],
	messages: [
		{
			_text: "",
			_font: "20px Arial",
			_color: "#ffffff",
			x: 20,
			y: 360,
			lineWidth : 480,
			center_x : true

		}
	]
};
