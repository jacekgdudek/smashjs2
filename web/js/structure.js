var data = { 
	game: {
		scenes: [
			{ 
				name: "safe",
				init: safeScene.init,
				update: safeScene.update,
				stage_id: "game_canvas",
				visuals: [
					{
					  src: "assets/bg/bg.jpg",
					  name: "bkg"
					}
				]
			},
			{
				name: "combination_lock",
				init: combinationScene.init,
				update: combinationScene.update,
				isCurrent: true,
				stage_id: "game_canvas",
				visuals: [
					{
					  src: "assets/combination/dial.png",
					  name: "dial",
					  player_id: 2
					},
					{
					  src: "assets/combination/indicator.png",
					  name: "indicator",
					  player_id: 2
					},
					{
					  src: "assets/combination/knob.png",
					  name: "knob",
					  player_id: 0
					}
				]
			}
		],
		levels: [
			{
				id: 0,
				scenes: [
					{ scene_id: "safe_door" },
					{ scene_id: "stethoscope_scene",
					  primary_tool: "default"}
				],
				reward: {
					items: [{"drill": 1}],
					money: 500
				}
			}
		]
	}
};
