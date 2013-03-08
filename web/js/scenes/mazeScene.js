/**
 *	The MAZE SCENE 
 *
 *	-- jacekgdudek
 *	-- Peekabu Studios
 *
 */

function MazeScene() {}


MazeScene.prototype.init = function() {
	Scene.prototype.init.call(this);
	console.log("init: mazeScene");
	
       	setGUI();
        this.gameStarted = false;

	//number of current lives
	this.currentLives = 100; 

	//text showing number of lives
        this.currentLives = 700- currentJob.risk*100;
 	this.lives = new createjs.Text(this.currentLives, "20px Arial", "#ff7700");
        lives.x = 700;
        lives.y = 10;
	this.stage.addChild(lives);

	var visuals = this.structure.visuals;
	//maze itself
	this.maze = visuals[1].bitmap;//new createjs.Bitmap("assets/maze/maze1.png");
        this.maze.visible = false;

	//position where players has to place his cursor before gamestart
	this.startHere = visuals[2].bitmap;//new createjs.Bitmap("assets/maze/startpoint.png");
        this.finishHere = visuals[2].bitmap;//new createjs.Bitmap("assets/maze/startpoint.png");

	this.stage.addChild(startHere);

	//burger created on players cursor position
	this.burger = visuals[3].bitmap;//new createjs.Bitmap("assets/maze/burger.png");

	this.burger.x = 500;
	this.stage.addChild(burger);
}

MazeScene.prototype.update = function() {
	//this.burger follows mouse cursor
        this.burger.x = this.stage.mouseX - this.burger.image.width/2;
        this.burger.y = this.stage.mouseY - this.burger.image.height/2;

	//checks for collision between this.burger and startpoint, if it occurs, starts the game
        var startPoint = ndgmr.checkPixelCollision(this.burger, startHere, 0, true)
        if (startPoint){
        	//createjs.Ticker.removeListener(gameReady);
        	console.log("START GAME");
        	this.gameStarted = true;
    		//update scene
    		this.stage.update();
	}
            
	if(this.gameStarted) {
		//creates the mask around cursor
		//
		// can be described as circle masking area around the cursor 
		var maskCircle = new createjs.Shape();
		maskCircle.graphics.beginStroke("black").setStrokeStyle(5).drawCircle(this.stage.mouseX, this.stage.mouseY, 100).endStroke();
		this.maze.mask = maskCircle;
		this.maze.visible = true;
		this.finishHere.x = 500;
		this.finishHere.y = 200;
		this.finishHere.mask = maskCircle;
		
		this.stage.addChild(this.maze);
		//checks for collision between this.burger and maze, if it occurs takes 10lives
		var intersection = ndgmr.checkPixelCollision(this.burger, this.maze,0, true);
		if(intersection){
		    console.log("collision");
		    this.currentLives -= 10;
		    this.lives.text = this.currentLives;
		    console.log("Lives = "+this.currentLives);
		}
		
		//victory & fail
		if(this.currentLives < 0)
		{
		    addEvent("FINNISHED_JOB",false);
		}
		
		var startPoint = ndgmr.checkPixelCollision(this.burger, this.finishHere, 0, true)
		if (startPoint){
		    addEvent("FINNISHED_JOB",true);
		}
		
	}
	
	//update scene
	this.stage.update();
}

