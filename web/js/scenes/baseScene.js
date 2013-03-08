function BaseScene(){}

BaseScene.prototype = new Scene(baseSceneStructure);

BaseScene.prototype.init = function() {
	Scene.prototype.init.call(this);
	console.log("init: baseScene");
	setGUI();
}

BaseScene.prototype.finalize = function() {
	Scene.prototype.finalize.call(this);
	hideGUI();
}
