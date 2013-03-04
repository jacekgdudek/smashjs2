var structure = { 
	preload: {
		stage_id: "game_canvas",
		bgsrc: "assets/loading/bg.jpg",
		bar:{
			x: 150,
			y: 400,
			width: 400,
			height: 40,
			color:"#3cb12c",
			highlight:"#6b0277",
			shadow: "#6b0277",
			ratio: [0,0.3,0.6, 1]
			}
		},
	game: {
		scenes: [
			{
				_name: "welcome",
				init: defaultScene.init,
				update: defaultScene.update,
				finalize: defaultScene.finalize,
				isCurrent: true,
				stage_id: "game_canvas",
				visuals: [
					{
					  src: "assets/bg/bg.jpg",
					  name: "bkg"
					},
					{
						x: 200,
						y: 300,
					  src: "assets/button/play.png",
					  name: "btn_play",
					  hasDown: true,
					  downEvent: {
						type: "SWITCH_SCENE",
						content: "tutorial_scene"
						}	
					},
					{
						x:200,
						y:400,
					  src: "assets/button/play.png",
					  name: "btn_play",
					  hasDown: true,
					  downEvent: {
						type: "START_NEW_GAME"
						}	
					},
					{
						x:400,
						y:400,
					  src: "assets/button/play.png",
					  name: "btn_play",
					  hasDown: true,
					  downEvent: {
						type: "CONTINUE_GAME"
						}	
					},
					{
						x:400,
						y:300,
					  	src: "assets/button/play.png",
					  	name: "btn_play",
					  	hasDown: true,
					 	downEvent: {
							type: "SWITCH_SCENE",
							content: "video_scene"
						}	
					}
				]
			},
			{
				_name: "video_scene",
				init: videoScene.init,
				update: videoScene.update,
				stage_id: "game_canvas",
				visuals: [
					{
					  src: "assets/combination/safe_bg.jpg",
					  name: "bkg"
					}
				],
				videos: [
					{
					  src: "assets/video/sample_mpeg4.mp4",
					  name: "test"
					}
				]
			},
			{
				_name: "intro",
				init: introScene.init,
				update: introScene.update,
				finalize: introScene.finalize,
				stage_id: "game_canvas",
				visuals: [
					{
					  src: "assets/combination/safe_bg.jpg",
					  name: "bkg"
					}
				]
			},
			{
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
			},
			{
				_name: "base_scene",
				init: defaultScene.init,
				update: defaultScene.update,
				finalize: defaultScene.finalize,
				isCurrent: true,
				stage_id: "game_canvas",
				visuals: [
					{
					  src: "assets/base/base_bkg2.jpg",
					  name: "bkg"
					},
					{
						x: 0,
						y: 20,
					  src: "assets/button/map_button.jpg",
					  name: "btn_play",
					  hasDown: true,
					  downEvent: {
						type: "SWITCH_SCENE",
						content: "map_scene"
						}	
					},
					{
						x:400,
						y:500,
					  src: "assets/button/job_button.jpg",
					  name: "btn_play",
					  hasDown: true,
					  downEvent: {
						type: "SWITCH_SCENE",
						content: "job_board_scene"
						}	
					},
					{
						x:0,
						y:120,
					  src: "assets/button/gallery_button.png",
					  name: "btn_play",
					  hasDown: true,
					  downEvent: {
						type: "SWITCH_SCENE",
						content: "gallery_scene"
						}	
					},
					{
						x:600,
						y:0,
					  src: "assets/base/cashnrisk.jpg",
					  name: "cash_disp",
					  hasDown: true,
					  textLines:[
					  	{
					  		text: "Cash: 0",
					  		x: 40,
					  		y: 40
					  	},
					  	{
					  		text: "Risk: 0",
					  		x: 140,
					  		y: 40
					  	}
					  ],
					  downEvent: {
						type: "SWITCH_SCENE",
						content: "gallery_scene"
						}	
					}
				]
			},
			{
				_name: "map_scene",
				init: cityScene.init,
				update: cityScene.update,
				finalize: cityScene.finalize,
				stage_id: "game_canvas",
				catSrc: "assets/city_map/cat.jpg",
				cityPointerSrc: "assets/city_map/cat.jpg",
				cityPointerRect:
				{
					x: 0,
					y: 0,
					width: 320,
					height: 240
					},
				visuals: [
					{
					  src: "assets/base/base_bkg2.jpg",
					  name: "bkg"
					},
					{
						x:20,
						y:20,
					  src: "assets/map/europe_map.jpg",
					  name: "btn_play"
					},
					{
						x: 600,
						y: 500,
					  src: "assets/button/back_btn.jpg",
					  name: "btn_play",
					  hasDown: true,
					  downEvent: {
						type: "SWITCH_SCENE",
						content: "base_scene"
						}	
					},
					{
						x:40,
						y:600,
						src: "assets/city_map/card.jpg",
						name: "btn_play"
					}
				]
			},
			{
				_name: "job_board_scene",
				init: jobsScene.init,
				update: jobsScene.update,
				finalize: jobsScene.finalize,
				isCurrent: true,
				stage_id: "game_canvas",
				catSrc: "assets/city_map/cat.jpg",
				jobPointerSrc: "assets/city_map/cat.jpg",
				jobPointerRect:
				{
					x: 0,
					y: 0,
					width: 320,
					height: 240
					},
				visuals: [
					{
					  src: "assets/base/base_bkg2.jpg",
					  name: "bkg"
					},
					{
						x:20,
						y:20,
					  src: "assets/city_map/city_map.jpg",
					  name: "btn_play"
					},
					{
						x: 600,
						y: 500,
					  src: "assets/button/back_btn.jpg",
					  name: "btn_play",
					  hasDown: true,
					  downEvent: {
						type: "SWITCH_SCENE",
						content: "base_scene"
						}	
					},
					{
						x:40,
						y:600,
						src: "assets/city_map/card.jpg",
						name: "btn_play",
						hasDown: true,
						downEvent: {
							type: "SWITCH_SCENE",
							content: "combination_lock"
							}	
						},
					{
						x: 600,
						y: 500,
					  src: "assets/button/back_btn.jpg",
					  name: "btn_play",
					  hasDown: true,
					  downEvent: {
						type: "SWITCH_SCENE",
						content: "base_scene"
						}	
					}
				]
			},
			{
				_name: "gallery_scene",
				init: galleryScene.init,
				update: galleryScene.update,
				finalize: galleryScene.finalize,
				isCurrent: true,
				stage_id: "game_canvas",
				galleryGrid:{
					width: 6,
					height: 3,
					},
				visuals: [
					{
					  src: "assets/base/base_bkg2.jpg",
					  name: "bkg"
					},
					{
						x:20,
						y:20,
					  src: "assets/gallery/gallery_bkg.jpg",
					  name: "btn_play"
					},
					{
						x: 600,
						y: 500,
					  src: "assets/button/back_btn.jpg",
					  name: "btn_play",
					  hasDown: true,
					  downEvent: {
						type: "SWITCH_SCENE",
						content: "base_scene"
						}	
					}
				]
			},
			{
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
			},
			{
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
			},
			{
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
		],
		jobs: {
			initialJobs:
			[
				{
					index:0,
					name:"kindergarden",
					type:"combination_lock",
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
					name:"combination_lock"
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
					src: "assets/credits/0.jpg",
					name: "audio"
				},
				{
					src: "assets/credits/2.jpg",
					name: "video"
				}
			],
			rewards:[
				{
					contentId: 0,
					src: "",
					type: 0,
					downEvent: {
						type: "SPECIAL_REWARD_BUTTON_DOWN",
						content: 0
						}

				},
				{
					contentId: 1,
					src: "",
					type: 1,
					downEvent: {
						type: "SPECIAL_REWARD_BUTTON_DOWN",
						content: 1
						}
				}
			]
			
		},
		elements:[
		{
			src: "assets/credits/bg.jpg",
			name: "bg",
			subelements:[
			{
				src: "assets/credits/0.jpg",
			},
			{
				src: "assets/credits/1.jpg",
			},
			{
				src: "assets/credits/2.jpg",
			},
			{
				src: "assets/credits/3.jpg",
			},
			{
				src: "assets/credits/4.jpg",
			},
			{
				src: "assets/credits/5.jpg",
			},
			{
				src: "assets/credits/6.jpg",
			},
			{
				src: "assets/credits/7.jpg",
			},
			{
				src: "assets/credits/8.jpg",
			},
			{
				src: "assets/credits/9.jpg",
			},
			{
				src: "assets/credits/dollar.jpg",
			},
			{
				src: "assets/credits/comma.jpg",
			}
			]
		}
		],
		cities:[
			{
				name:"Edinburgh",
				pointerSrc:"assets/credits/8.jpg",
				pointerHighlightsSrc:"assets/credits/dollar.jpg",
				maxHeat: 200,
				currHeat: 20,
				travelCost: 200,
				reward:1,
				risk:1
			},
			{
				name:"London",
				pointerSrc:"assets/credits/8.jpg",
				pointerHighlightsSrc:"assets/credits/dollar.jpg",
				maxHeat: 2000,
				currHeat: 20,
				travelCost: 2000,
				reward:1,
				risk:2
			},
			{
				name:"Praga",
				pointerSrc:"assets/credits/8.jpg",
				pointerHighlightsSrc:"assets/credits/dollar.jpg",
				maxHeat: 400,
				currHeat: 20,
				travelCost: 2000,
				reward:2,
				risk:1
			},
			{
				name:"Rome",
				pointerSrc:"assets/credits/8.jpg",
				pointerHighlightsSrc:"assets/credits/dollar.jpg",
				maxHeat: 200,
				currHeat: 20,
				travelCost: 20000,
				reward:2,
				risk:4
			},
			{
				name:"Paris",
				pointerSrc:"assets/credits/8.jpg",
				pointerHighlightsSrc:"assets/credits/dollar.jpg",
				maxHeat: 200,
				currHeat: 20,
				travelCost: 20000,
				reward:3,
				risk:3
			},
			{
				name:"PeekabuLand",
				pointerSrc:"assets/credits/8.jpg",
				pointerHighlightsSrc:"assets/credits/dollar.jpg",
				maxHeat: 2000,
				currHeat: 20,
				travelCost: 20000,
				reward:5,
				risk:1
			}
		],
		font:
		{
			_type: "24px Arial",
			_color: "#ffffff",
		}

	}
};
