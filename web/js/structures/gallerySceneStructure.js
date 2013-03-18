var gallerySceneStructure = {
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
		  src: "assets/base/desk_base.jpg",
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
			content: "base_scene",
			content2: 0
			}	
		}
	]
};
