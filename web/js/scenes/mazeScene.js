var mazeScene = (function() {

	var burger; //burger created on players cursor position
    var maze; //maze itself
    var lives; //text showing number of lives
    var currentLives = 100; //number of current lives
    var startHere; //position where players has to place his cursor before gamestart
    var finnishHere;
    var maskCircle; //circle masking area around the cursor 
    var scene;

    var gameStarted = false;

	return {
		init: function(scene) {
			console.log("init: mazeScene");

			this.scene = scene;
            setGUI();
            currentLives = 700- currentJob.risk*100;
            gameStarted = false;
			lives = new createjs.Text(currentLives, "20px Arial", "#ff7700");
        	lives.x = 700;
        	lives.y = 10;
	        this.scene.stage.addChild(lives);
	        maze = this.scene.visuals[1].bitmap;//new createjs.Bitmap("assets/maze/maze1.png");
            maze.visible = false;

	        startHere = this.scene.visuals[2].bitmap;//new createjs.Bitmap("assets/maze/startpoint.png");
            finnishHere = this.scene.visuals[2].bitmap;//new createjs.Bitmap("assets/maze/startpoint.png");

	        this.scene.stage.addChild(startHere);

	        burger = this.scene.visuals[3].bitmap;//new createjs.Bitmap("assets/maze/burger.png");

	        burger.x = 500;
	        this.scene.stage.addChild(burger);

		},
		update: function() {
			//burger follows mouse cursor
            burger.x = this.scene.stage.mouseX - burger.image.width/2;
            burger.y = this.scene.stage.mouseY - burger.image.height/2;

            //checks for collision between burger and startpoint, if it occurs, starts the game
            var startPoint = ndgmr.checkPixelCollision(burger, startHere, 0, true)
            if (startPoint){
                //createjs.Ticker.removeListener(gameReady);
                console.log("START GAME");
                gameStarted = true;
    			//update scene
    			this.scene.stage.update();
		      }
            
            if(gameStarted)
            {
                //creates the mask around cursor
                maskCircle = new createjs.Shape();
                maskCircle.graphics.beginStroke("black").setStrokeStyle(5).drawCircle(this.scene.stage.mouseX, this.scene.stage.mouseY, 100).endStroke();
                maze.mask = maskCircle;
                maze.visible = true;
                finnishHere.x = 500;
                finnishHere.y = 200;
                finnishHere.mask = maskCircle;

                this.scene.stage.addChild(maze);
                //checks for collision between burger and maze, if it occurs takes 10lives
                var intersection = ndgmr.checkPixelCollision(burger, maze,0, true);
                if(intersection){
                    console.log("collision");
                    currentLives -= 10;
                    lives.text = currentLives;
                    console.log("Lives = "+currentLives);
                }

                //victory & fail
                if(currentLives < 0)
                {
                    addEvent("FINNISHED_JOB",false);
                }

                var startPoint = ndgmr.checkPixelCollision(burger, finnishHere, 0, true)
                if (startPoint){
                    addEvent("FINNISHED_JOB",true);
                }
                
            }
            
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
	

})();