var stethoscopeScene = (function() {
	var scene;
	var input, output;
	var target, targetRange, furthestCorner;		

	return {
		init: function() {
			console.log("init: stethoscopeScene");
			
			input = new Point(0,0);

			output = new createjs.Text("Open the console and try to maximise the intensity", "14px Arial");
			output.x = output.y = 10;
			scene.stage.addChild(output);
			//var downArrow = new createjs.Bitmap("../media/visuals/safe/down_arrow.bmp");
			//stage.addChild(downArrow);

			var screen = { 
				x : 0,
				y : 0,
				width : 500,
				height : 300
			};


			// Set up the target
			target = randomPointInRect(screen);
			targetRange = 30;
			console.log("RandomPoint: x:%s, y:%s",target.x,target.y);
			furthestCorner = getFurthestCorner(target,screen);
			console.log("FurthestCornerDistance: %s",furthestCorner);
			

			// add a handler for all the events we're interested in:
			//scene.stage.onTick = update;
			scene.stage.onMouseMove = handleMouseMove;
			scene.stage.update();
			//createjs.Ticker.addListener(stage);
		},
		update: function() {
			var distanceToTarget = input.distanceTo(target)-targetRange;
			var maxDistance = target.distanceTo(furthestCorner)-targetRange;
			var proportionToTarget = distanceToTarget / maxDistance;
			var intensity = 1 - proportionToTarget;
			console.log("Intensity: %s",intensity);
			if (distanceToTarget < targetRange) {
				console.log("Entry point found!");
			}
		}
	};
	
	function Point(x, y) {
		this.x = x;
		this.y = y;

		// Computes the distance between this point and the given point p.  
		this.distanceTo = function(p) {
			var dx = this.x - p.x;
			var dy = this.y - p.y;
			return Math.sqrt(dx * dx + dy * dy);
		};
	};


	// Returns a text representation of this object, such as "(3, -4)"
	Point.prototype.toString = function() {
		return "(" + this.x + ", " + this.y + ")";
	};

	function randomPointInRect(rect) {
		return new Point(	Math.floor(Math.random() * rect.width), 
					Math.floor(Math.random() * rect.height));
	};

	function getFurthestCorner(point, rect) {
		var corners = new Array(new Point(rect.x,rect.y),
					new Point(rect.x+rect.width,rect.y),
					new Point(rect.x,rect.y+rect.height),
					new Point(rect.x+rect.width,rect.y+rect.height));

		var maxDist = 0;
		var maxCorner = corners[0];
		for (var c in corners) {
			var dist = corners[c].distanceTo(point);
			if (dist > maxDist) {
				maxDist = dist;
				maxCorner = corners[c];
			}
		}
		return maxCorner;
	}

	function handleMouseMove(evt) {
		//console.log("evt.stageX: %s, evt.stageY: %s",evt.stageX,evt.stageY);
		input.x = evt.stageX;
		input.y = evt.stageY;
		
		// to save CPU, we're only updating when we need to, instead of on a tick:1
		stage.update();
	}
})();
