//var introScene = (function() {
//
function IntroScene(){}

IntroScene.prototype = new Scene(introSceneStructure);

IntroScene.prototype.init = function(scene) {
	Scene.prototype.init.call(this);
	console.log("init: introScene");

	this.scene = scene;
	this.delay = 200;

};

IntroScene.prototype.update = function() {
	this.delay--;
	if(this.delay < 0) addEvent("SWITCH_SCENE","tutorial_scene");
};

