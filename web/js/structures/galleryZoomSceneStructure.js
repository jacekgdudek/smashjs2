var galleryZoomSceneStructure = {
	_name: "gallery_zoom_scene",
	init: galleryZoomScene.init,
	update: galleryZoomScene.update,
	finalize: galleryZoomScene.finalize,
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
		},
		{
			x:100,
			y:500,
			src: "assets/gallery/left-arrow.jpg",
			name: "arrow-left"
		},
		{
			x:500,
			y:500,
			src: "assets/gallery/right-arrow.jpg",
			name: "arrow-left"
		}
	]
};
