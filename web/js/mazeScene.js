var mazeScene = (function() {

	var burger; //burger created on players cursor position
    var maze; //maze itself
    var lives; //text showing number of lives
    var currentLives = 100; //number of current lives
    var startHere; //position where players has to place his cursor before gamestart
    var maskCircle; //circle masking area around the cursor 
    var scene;

	return {
		init: function(scene) {
			console.log("init: mazeScene");

			this.scene = scene;
			lives = new createjs.Text(currentLives, "20px Arial", "#ff7700");
        	lives.x = 700;
        	lives.y = 10;
	        this.scene.stage.addChild(lives);
	        maze = new createjs.Bitmap("assets/maze/maze1.png");
	        maze.x = 0;
	        maze.y =0;
	        startHere = new createjs.Bitmap("assets/maze/startpoint.png");

	        this.scene.stage.addChild(startHere);

	        burger = new createjs.Bitmap("assets/maze/burger.png");
	        burger.x = 500;
	        this.scene.stage.addChild(burger);

		},
		update: function() {
			//burger follows mouse cursor
			this.scene.stage.onMouseMove = function(mousePos){
                burger.x = this.scene.stage.mouseX - burger.image.width/2;
                burger.y = this.scene.stage.mouseY - burger.image.height/2;
            }
            //checks for collision between burger and startpoint, if it occurs, starts the game
            var startPoint = ndgmr.checkPixelCollision(burger, startHere, 0, true)
            if (startPoint){
                this.scene.stage.removeChild(startHere);
                //createjs.Ticker.removeListener(gameReady);
                console.log("START GAME");
                startGame();
			//update scene
			this.scene.stage.update();
		}
			function startGame(e){
            this.scene.stage.onMouseMove = function(mousePos) {
            burger.x = stage.mouseX - burger.image.width/2;
            burger.y = stage.mouseY - burger.image.height/2;
            
            //creates the mask around cursor
            maskCircle = new createjs.Shape();
            maskCircle.graphics.beginStroke("black").setStrokeStyle(5).drawCircle(this.scene.stage.mouseX, this.scene.stage.mouseY, 100).endStroke();
            maze.mask = maskCircle;

            this.scene.stage.addChild(maze);
            //checks for collision between burger and maze, if it occurs takes 10lives
             var intersection = ndgmr.checkPixelCollision(burger, maze,0, true);
              if(intersection){
                console.log("collision");
                currentLives -= 10;
                lives.text = currentLives;
                console.log("Lives = "+currentLives);
              }
         }
        }
		},
		

	};
	

})();