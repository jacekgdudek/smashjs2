/**
 *	The MAZE SCENE 
 *
 *	-- jacekgdudek
 *	-- Peekabu Studios
 *
 */

<<<<<<< HEAD
function MazeScene() {}
=======
    var back;
	var burger; //burger created on players cursor position
    var cable;
    var maze; //maze itself
    var lives; //text showing number of lives
    var currentLives = 100; //number of current lives
    var startHere; //position where players has to place his cursor before gamestart
    var finnishHere;
    var maskCircle; //circle masking area around the cursor 
    var scene;
>>>>>>> c0c7e01a16ddcb774f09d6e5cc4a99497e647772


<<<<<<< HEAD
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
=======
	return {
		init: function(scene) {
			console.log("init: mazeScene");

			this.scene = scene;
            setGUI();
            armHeat();
            gameStarted = false;
			lives = new createjs.Text(currentLives, "20px Arial", "#ff7700");
        	lives.x = 700;
        	lives.y = 10;
	        this.scene.stage.addChild(lives);
	        maze = this.scene.visuals[1].bitmap;//new createjs.Bitmap("assets/maze/maze1.png");
            maze.visible = false;

            back = this.scene.visuals[4].bitmap;

	        startHere = this.scene.visuals[2].bitmap;//new createjs.Bitmap("assets/maze/startpoint.png");
            finnishHere = this.scene.visuals[2].bitmap;//new createjs.Bitmap("assets/maze/startpoint.png");

	        this.scene.stage.addChild(this.scene.visuals[0].bitmap, startHere);
>>>>>>> c0c7e01a16ddcb774f09d6e5cc4a99497e647772

	var visuals = this.structure.visuals;
	//maze itself
	this.maze = visuals[1].bitmap;//new createjs.Bitmap("assets/maze/maze1.png");
        this.maze.visible = false;

	//position where players has to place his cursor before gamestart
	this.startHere = visuals[2].bitmap;//new createjs.Bitmap("assets/maze/startpoint.png");
        this.finishHere = visuals[2].bitmap;//new createjs.Bitmap("assets/maze/startpoint.png");

<<<<<<< HEAD
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
=======
		},
		update: function() {
			//burger follows mouse cursor
            if(useFiducials)
            {
                burger.x = 800 - burger.image.width - (((800 - burger.image.width)/(640 - (2*100)))*(inputArray[0].x - 100));
                burger.y = (600/480)*inputArray[0].y;
            }
            else
            {
                burger.x = this.scene.stage.mouseX - burger.image.width/2;
                burger.y = this.scene.stage.mouseY - burger.image.height/2;
            }
            

            
            if(this.cable)
            {
                this.scene.stage.removeChild(this.cable.bmp);
            }
            else
            {
                this.cable = new Object();
            }
            var length = 10;
            //---------prepare path
            var path = new Array();
            var point = new Object();
            point.x = burger.x+ burger.image.width/2;
            point.y = burger.y+ burger.image.height/2;

            if(this.cable.path)
            {
                if(this.cable.path.length != 0)
                {
                    if((point.x >  this.cable.path[0].x+2 || point.x < this.cable.path[0].x-2) || 
                        (point.y >  this.cable.path[0].y+2 || point.y < this.cable.path[0].y-2))
                    {
                        path.push(point);
                        for (var i = 0 ; i < this.cable.path.length ; i ++)
                        {
                            if(i > 19) break;
                            path.push(this.cable.path[i]);
                        }
                        
                    }
                    else
                    {
                        path = this.cable.path;
                    }
                }
                else
                {
                    path.push(point);
                }
            }
            else
            {
                path.push(point);
            }
            
            // //add new point
            
            // 
            this.cable.path = path;

            // this.scene.stage.removeChild(this.cable);
            this.cable.bmp = new createjs.Shape();

            var dist = Math.sqrt(Math.pow(this.cable.path[0].y - this.cable.path[this.cable.path.length-1].y,2) + Math.pow(this.cable.path[0].x - this.cable.path[this.cable.path.length-1].x,2));

            this.cable.bmp.graphics.setStrokeStyle(12,"round")
                            .beginRadialGradientStroke(["#D00","#000","#D00","#000","#D00","#000"], [0,0.1, 0.2, 0.4, 0.6, 1], this.cable.path[0].x, this.cable.path[0].y,0, this.cable.path[0].x, this.cable.path[0].y, this.cable.path[this.cable.path.length-1].y, dist )
                            .moveTo(this.cable.path[0].x, this.cable.path[0].y);

            for(var i = 1 ; i < this.cable.path.length ; i ++)
            {
                 this.cable.bmp.graphics.lineTo(this.cable.path[i].x, this.cable.path[i].y);
            }

            //checks for collision between burger and startpoint, if it occurs, starts the game
            var startPoint = ndgmr.checkPixelCollision(burger, startHere, 0, true)
            if (startPoint){
                //createjs.Ticker.removeListener(gameReady);
                console.log("START GAME");
                gameStarted = true;
    			//update scene
		      }
            
            if(gameStarted)
            {
                //creates the mask around cursor
                maskCircle = new createjs.Shape();
                maskCircle.graphics.beginStroke("black").setStrokeStyle(5).drawCircle(burger.x, burger.y, 100).endStroke();
                back.mask = maskCircle;
                maze.mask = maskCircle;
                this.cable.bmp.mask = maskCircle;
                maze.visible = true;
                finnishHere.x = 500;
                finnishHere.y = 200;
                finnishHere.mask = maskCircle;

                this.scene.stage.addChild(back,finnishHere, this.cable.bmp, maze, burger);
                //checks for collision between burger and maze, if it occurs takes 10lives
                var intersection = ndgmr.checkPixelCollision(burger, maze,0, true);
                if(intersection){
                    console.log("collision");
                    heat.time -= 1;
                    lives.text = currentLives;
                    console.log("Lives = "+currentLives);
                }

                //victory & fail
                if(heat.time < 0)
                {
                    addEvent("FINNISHED_JOB",false);
                }

                var startPoint = ndgmr.checkPixelCollision(burger, finnishHere, 0, true)
                if (startPoint){
                    addEvent("FINNISHED_JOB",true);
                }
                
            }
            setGUI();
            //update scene
            this.scene.stage.update();
        },
        finalize: function() {
            for(var i = 0 ; i < this.scene.visuals.length ; i++)
            {
                this.scene.visuals[i].visible = false;
            }
		}
		

	};
	function updateCable(x, y)
    {
        
        
    }
>>>>>>> c0c7e01a16ddcb774f09d6e5cc4a99497e647772

