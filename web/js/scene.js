//
//	SCENE 
//
//	Brief Usage Tutorial: 
//	
// 	// Firstly, create a file in js/structures e.g. mySceneStructure.js -- see any of the files in the folder for an example
//
//	// Secondly, create another file in js/scenes e.g. myScene.js
//
//	// In myScene.js you define a class for the logic that takes place in your scene
// 	function MyScene(){}
//	
// 	// Additionally, add the line:
// 	MyScene.prototype = Scene(mySceneStructure); // The scene now inherits some additional methods which you can override
//
// 	MyScene.init - a function that is called when your scene is first launched
// 	MyScene.update - a function that is called every frame
// 	MyScene.finalize -a function that cleans up when your game is over and lets the engine know it can move on
//
// 	// Scenes are object oriented for example your complex safe may become as it may share an initialisation proceedure for example
// 	MySceneWithSharedLogic.prototype = new MyScene(mySceneWithSharedLogicStructure);
//
// 	from within these methods you can access:
//
// 	#	Easel.js Stage: this.stage
//
// 	#	Static Game Logic: this.structure
// 	
// 	#	Event Passing Interface: addEvent/addEventEx - (This is also used within this.structure)
// 	
// 	#	Sound Backend: SoundManager
// 	
// 	#	Video Player Backend: VideoManager 
//
//	To see an example of a scene see the folder: js/scenes
//

function Scene(structure) {
	this.structure = structure;
}

Scene.prototype.init = function() {
	console.log("init: scene");

	//setGUI();

	// add a handler for all the events we're interested in
	document.onkeydown = this.handleKeyDown;
	//scene.stage.onTick = update;

	var visuals = this.structure.visuals;

	//make sure all the assets are visible
	for(var i = 0 ; i < visuals.length ; i++)
	{
		visuals[i].visible = true;
	}

	//handle mouse events
	this.stage.onMouseMove = function(mousePos) {
		for(var i = 0 ; i < visuals.length ; i++)
		{
			if(visuals[i].hasHover)
			{
				if(visuals[i].bitmap.hitTest( mousePos.stageX , mousePos.stageY ))
				{
					//console.log("hover state initialized");
				}
			}
		}
	}

	this.stage.onMouseDown = function(mousePos) {
		for(var i = 0 ; i < visuals.length ; i++)
		{
			if(visuals[i].hasDown)
			{
				if(visuals[i].bitmap.hitTest( mousePos.stageX - visuals[i].bitmap.x , mousePos.stageY - visuals[i].bitmap.y ))
				{
					addEventEx(visuals[i].downEvent);
					console.log("down state initialized");
				}
			}
		}
	}

}

Scene.prototype.update = function() {
	if(this.structure._name == "welcome")
	{
		hideGUI();
	}

	//update this.scene
	this.stage.update();
}

Scene.prototype.finalize = function() {
	for(var i = 0 ; i < this.structure.visuals.length ; i++)
	{
		this.structure.visuals[i].visible = false;
	}
	if (this.structure.hasOwnProperty("messages")) {
		for(var i = 0 ; i < this.structure.messages.length ; i++)
		{
			this.structure.messages[i].bg.visible = false;
			this.structure.messages[i].text.visible = false;
		}
	}
	//hideGUI();
}

Scene.prototype.handleKeyDown = function(evt) {
	// For now we use keyboard controls for the dial
	if (evt.keyIdentifier=="Left") { this.input.rotation -= 10; } 
	if (evt.keyIdentifier=="Right") { 
		console.log("scene inheritance working!");
		this.input.rotation += 10; }
}

