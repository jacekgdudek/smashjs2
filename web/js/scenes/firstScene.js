function FirstScene(){}

FirstScene.prototype = new Scene(firstSceneStructure);

FirstScene.prototype.init = function() {
	Scene.prototype.init.call(this);
	console.log("init: firstScene");
	setGUI();
}

FirstScene.prototype.finalize = function() {
	Scene.prototype.finalize.call(this);
	hideGUI();
}

