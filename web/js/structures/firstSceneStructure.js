console.log("Loading first scene structure");

var firstSceneStructure = {
	_name: "welcome",
	init: defaultScene.init,
	update: defaultScene.update,
	finalize: defaultScene.finalize,
	isCurrent: true,
	noGUI: true,
	stage_id: "game_canvas",
	visuals: [
		{
		  src: "assets/base/desk_base.jpg",
		  name: "bkg"
		},
		{
			x:230,
			y:330,
		  src: "assets/first/desk_notebook_2.png",
		  hoverSrc: "assets/first/desk_notebook_2_highlight.png",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "START_NEW_GAME"
			}
		},
		{
			x:100,
			y:50,
		  src: "assets/first/desk_notebook_3.png",
		  hoverSrc: "assets/first/desk_notebook_3_highlight.png",
		  name: "btn_play",
		  hasDown: true,
		  downEvent: {
			type: "CONTINUE_GAME"
			}	
		},
		{
			x:600,
			y:50,
			src: "assets/first/desk_whisky.png",
			hoverSrc: "assets/first/desk_whisky_highlight.png",
			name: "btn_play",
			hasDown: true,
			downEvent: {
				type: "SWITCH_SCENE",
				content: "settings",
				content2: 0
			}	
		}
	],
	overlayStructure:{
		x:0,
		y:0,
		src: "assets/bg/shadow2.png",
		pause:  220,
		duration: 265,
		min_value: 0.3,
		soundEffect: audioManagerAudioObject.BULB_SOUND

	}
};