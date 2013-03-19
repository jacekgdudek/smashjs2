var mazeScene = (function() {

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

    var gameStarted = false;
    var reflection;

	return {
		init: function(scene) {
			console.log("init: mazeScene");

			this.scene = scene;
            for(var i = 0; i < this.scene.visuals.length ; i ++)
            {
                this.scene.visuals[i].bitmap.alpha = 1;
                this.scene.stage.removeChild(this.scene.visuals[i].bitmap);
                this.scene.stage.addChild(this.scene.visuals[i].bitmap);
            }

            reflection = new Reflection(scene.stage);
            reflection.init(0.1);

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

	        burger = this.scene.visuals[3].bitmap;//new createjs.Bitmap("assets/maze/burger.png");

	        burger.x = 500;
	        this.scene.stage.addChild(burger);

		},
		update: function() {
			//burger follows mouse cursor
            if(useFiducials && inputArray[0].y != -1)
            {
                burger.x = (((800 - burger.image.width)/(640 - (2*100)))*(inputArray[0].x - 100));
                burger.y = 1.25*inputArray[0].y - 50;//(((600 - burger.image.height)/(480 - (2*100)))*(inputArray[0].y - 100));
            }
            else if (!useFiducials)
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
            reflection.update();
            this.scene.stage.update();
        },
        finalize: function() {
            reflection.finalize();
            for(var i = 0 ; i < this.scene.visuals.length ; i++)
            {
                this.scene.visuals[i].visible = false;
            }
		}
		

	};
	function updateCable(x, y)
    {
        
        
    }

})();