console.log("Loading structure");

var structure = { 
	preload: {
		stage_id: "game_canvas",
		bgsrc: "assets/loading/bg2.png",
		/*bar:{
			x: 150,
			y: 400,
			width: 400,
			height: 40,
			color:"#3cb12c",
			highlight:"#6b0277",
			shadow: "#6b0277",
			ratio: [0,0.3,0.6, 1]
			},*/
		knob:{
			src: "assets/loading/dial_base.png",
			src2: "assets/loading/dial_numbers.png",
			offset_angle: 112.5
		} 
		},
	game: {
		scenes: [	firstSceneStructure, 
				videoSceneStructure,
				introSceneStructure,
				tutorialSceneStructure,
				baseSceneStructure,
				citySceneStructure,
				jobSceneStructure,
				gallerySceneStructure,
				galleryZoomSceneStructure,
				rewardSceneStructure,
				combinationSceneStructure,
				settingsSceneStructure,
				previewSceneStructure,
				mazeSceneStructure
		],
		jobs: {
			initialJobs:
			[
				{
					index:0,
					name:"kindergarden",
					type:"maze_scene",
					reward:2,
					risk:1
				},
				{
					index:1,
					name:"corner shop",
					type:"combination_lock",
					reward:3,
					risk:1
				},
				{
					index:2,
					name:"Theodora's apartment",
					type:"combination_lock",
					reward:2,
					risk:1
				},
				{
					index:3,
					name:"local supermarket",
					type:"combination_lock",
					reward:5,
					risk:1,
					conditions:[
						{
							value:1
						},
						{
							value:0
						}
					]
				},
				{
					index:4,
					name:"Peekabu office",
					type:"combination_lock",
					reward:2,
					risk:1,
					conditions:[
						{
							value:1
						},
						{
							value:0
						}
					]
				},
				{
					index:5,
					name:"jewelery shop",
					type:"combination_lock",
					reward:1,
					risk:2,
					conditions:[
						{
							value:0
						}
					]
				}
			],
			types:[
				{
					name:"combination_lock"
				},
				{
					name:"maze_scene"
				}
			],
			names:[
				{
					name:"a1"
				},
				{
					name:"a2"
				},
				{
					name:"a3"
				},
				{
					name:"b1"
				},
				{
					name:"b4"
				},
				{
					name:"b6"
				},
				{
					name:"a8"
				},
				{
					name:"cffg"
				},
				{
					name:"a1dasfd"
				},
				{
					name:"a1asdfwweewe"
				},
				{
					name:"1231231"
				},
				{
					name:"cxvdsaga"
				},
				{
					name:"asdfaswerrw"
				}
			]

		},
		specialRewards:{
			thumbnails:[
				{
					src: "assets/reward/dvd_1.png",
					name: "audio",
				},
				{
					src: "assets/reward/dvd_2.png",
					name: "video",
				}
			],
			rewards:[
				{
					contentId: 0,
					src: "assets/reward/cash.png",
					type: 0,
					contentType: "audio",
					downEvent: {
						type: "SPECIAL_REWARD_BUTTON_DOWN",
						content: 0
						}

				},
				{
					contentId: 1,
					src: "assets/reward/ring.png",
					type: 1,
					contentType: "video",
					videoId:"videoPlayer",
					downEvent: {
						type: "SPECIAL_REWARD_BUTTON_DOWN",
						content: 1
						}
				}
				/*{
					contentId: 2,
					src: "assets/reward/watch.png",
					type: 2,
					downEvent: {
						type: "SPECIAL_REWARD_BUTTON_DOWN",
						content: 2
						}
				}*/
			]
			
		},
		elements:[
		{
			horizontal_offset: 6,

			vertical_offset: 5,
			slot_width: 20,
			x:10,
			y:7,

			src: "assets/credits/cash_frame.png",
			roller: "assets/credits/roller.png",
			name: "bg",
			subelements:[
			{
				src: "assets/credits/0.png",
			},
			{
				src: "assets/credits/1.png",
			},
			{
				src: "assets/credits/2.png",
			},
			{
				src: "assets/credits/3.png",
			},
			{
				src: "assets/credits/4.png",
			},
			{
				src: "assets/credits/5.png",
			},
			{
				src: "assets/credits/6.png",
			},
			{
				src: "assets/credits/7.png",
			},
			{
				src: "assets/credits/8.png",
			},
			{
				src: "assets/credits/9.png",
			},
			{
				src: "assets/credits/dollar.png",
			},
			{
				src: "assets/credits/comma.png",
			}
			]
		},
		{
			highlight_color: "#aa764d",
			shadow_color: "#5a3e29",
			regular_color: "#6d4c32",
			horizontal_offset: 3,
			vertical_offset: 5,
			x: 225,
			y: 7,
			width: 335,
			height: 40,
			maxHeat: 200,
			src: "assets/heat/frame.png"
		},
		{
			highlight_color: "#aa764d",
			shadow_color: "#5a3e29",
			regular_color: "#6d4c32",
			horizontal_offset: 3,
			vertical_offset: 5,
			x: 620,
			y: 7,
			src: "assets/credits/cash_frame.png"
		}

		],
		cities:[
			{
				name:"Poland",
				pointerSrc:"assets/map/europe_poland.png",
				pointerHighlightsSrc:"assets/map/europe_poland.png",
				info:"Small town.. burke and hare",
				heat: 0,
				maxHeat: 200,
				currHeat: 20,
				travelCost: 200,
				reward:1,
				risk:1
			},
			{
				name:"Albania",
				pointerSrc:"assets/map/europe_albania.png",
				pointerHighlightsSrc:"assets/map/europe_albania.png",
				info:"Hello governor !",
				maxHeat: 2000,
				currHeat: 20,
				travelCost: 2000,
				reward:1,
				risk:2,
				heat: 0
			},
			{
				name:"Bulgaria",
				pointerSrc:"assets/map/europe_bulgaria.png",
				pointerHighlightsSrc:"assets/map/europe_bulgaria.png",
				info:"You be good .. or else",
				maxHeat: 400,
				currHeat: 20,
				travelCost: 2000,
				reward:2,
				risk:1,
				heat: 0
			},
			{
				name:"Czech Republic",
				pointerSrc:"assets/map/europe_czech.png",
				pointerHighlightsSrc:"assets/map/europe_czech.png",
				info:"Me gusto spaghetti",
				maxHeat: 200,
				currHeat: 20,
				travelCost: 20000,
				reward:2,
				risk:4,
				heat: 0
			},
			{
				name:"Herzegovina",
				pointerSrc:"assets/map/europe_herz.png",
				pointerHighlightsSrc:"assets/map/europe_herz.png",
				info:"Take whatever you want.. I surrender",
				maxHeat: 200,
				currHeat: 20,
				travelCost: 20000,
				reward:3,
				risk:3,
				heat: 0
			},
			{
				name:"Hungary",
				pointerSrc:"assets/map/europe_hungary.png",
				pointerHighlightsSrc:"assets/map/europe_hungary.png",
				info:"...",
				maxHeat: 2000,
				currHeat: 20,
				travelCost: 20000,
				reward:5,
				risk:1,
				heat: 0
			},
			{
				name:"Montenegro",
				pointerSrc:"assets/map/europe_montenegro.png",
				pointerHighlightsSrc:"assets/map/europe_montenegro.png",
				info:"...",
				maxHeat: 2000,
				currHeat: 20,
				travelCost: 20000,
				reward:5,
				risk:1,
				heat: 0
			},
			{
				name:"Romania",
				pointerSrc:"assets/map/europe_romania.png",
				pointerHighlightsSrc:"assets/map/europe_romania.png",
				info:"...",
				maxHeat: 2000,
				currHeat: 20,
				travelCost: 20000,
				reward:5,
				risk:1,
				heat: 0
			},
			{
				name:"Serbia",
				pointerSrc:"assets/map/europe_serbia.png",
				pointerHighlightsSrc:"assets/map/europe_serbia.png",
				info:"...",
				maxHeat: 2000,
				currHeat: 20,
				travelCost: 20000,
				reward:5,
				risk:1,
				heat: 0
			},
			{
				name:"Slovakia",
				pointerSrc:"assets/map/europe_slovak.png",
				pointerHighlightsSrc:"assets/map/europe_slovak.png",
				info:"...",
				maxHeat: 2000,
				currHeat: 20,
				travelCost: 20000,
				reward:5,
				risk:1,
				heat: 0
			}
		],
		font:
		{
			_type: "24px Arial",
			_color: "#ffffff",
		},
		audio:
		[
			audioContent
		]

	}
};


