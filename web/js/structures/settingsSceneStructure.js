console.log("Loading settings scene structure");

var settingsSceneStructure = {
	_name: "settings",
	init: settingsScene.init,
	update: settingsScene.update,
	finalize: settingsScene.finalize,
	isCurrent: true,
	noGUI: true,
	stage_id: "game_canvas",
	visuals: [
		{
		  src: "assets/settings/bg.png",
		  name: "bkg"
		},
		{
			x:-200,
			y:-400,
		  	src: "assets/settings/btn.png",
		},
		{
			x:-200,
			y:-400,
		  	src: "assets/settings/btn_hover.png",
		  	hasDown: true,
		  	downEvent: {
				type: "TRIGGER_SETTING"
			}
		},
		{
			x:-300,
			y:-400,
		  	src: "assets/form/checkbox.png",
		  	hasDown: true,
		  	downEvent: {
				type: "TRIGGER_SETTING"
			}
		},
		{
			x:-300,
			y:-400,
		  	src: "assets/form/checkbox_unticked.png",
		  	hasDown: true,
		  	downEvent: {
				type: "TRIGGER_SETTING"
			}
		},
		{
			x:600,
			y:400,
			src: "assets/button/play.png",
			name: "btn_play",
			hasDown: true,
			downEvent: {
				type: "SWITCH_SCENE",
				content: "welcome",
				content2: 1
			}	
		},
	],
	settings:[
		{
			type: 0,
			normal: 1,
			hover: 2,
			checkbox: [3,4],
			downEvent: "SETIINGS_SOUND_ENABLE",
			text: "Enable Sound"
		},
		{
			type: 0,
			normal: 1,
			hover: 2,
			checkbox: [3,4],
			downEvent: "SETTINGS_FLIP_X",
			text: "Flip X axis"
		},
		{
			type: 1,
			normal: 1,
			hover: 2,
			downEvent: "OPEN_PREVIEW",
			text: "Open Preview"
		}

	]
};
