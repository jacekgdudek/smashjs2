function CombinationIndicator(_stage){

	var stage = _stage;

	var indicatorPointers = new Array();

	var nextPos, currPos;

	var minRotation, maxRotation, widthRotation;
	
	//INIT======================================
	this.init = function(risk, pointerRef,num)
	{
		nextPos = 0;
		currPos = 0;

		maxRotation = pointerRef.finnishAngle;
		minRotation = pointerRef.startAngle;
		widthRotation = pointerRef.widthAngle;

		for(var i = 0 ; i < num ; i ++)
		{
			var indicatorPointer = new Object();

			indicatorPointer.bmp = pointerRef.bitmap.clone();
			indicatorPointer.bmp.rotation = minRotation + i*widthRotation;
			indicatorPointer.bmp.x = pointerRef.refX+indicatorPointer.bmp.regX;
			indicatorPointer.bmp.y = pointerRef.refY+indicatorPointer.bmp.regY;

			stage.addChild(indicatorPointer.bmp);
			indicatorPointers.push(indicatorPointer);
		}
	}

	//update callback on animation
	this.update = function(){

		if(currPos != nextPos)
		{
			if(nextPos == -1)
			{
				//distance between objects that goback
				var distance = -1;
				//reset
				for(var i = 0 ; i < indicatorPointers.length ; i ++)
				{
					//if not on begin position position
					if(i >= indicatorPointers.length - currPos)
					{
						//check distance to previous object
						//if object is not first
						var _dist;
						if(distance != -1)
						{
							_dist = indicatorPointers[i].bmp.rotation - indicatorPointers[i-1].bmp.rotation;
						}
						if(_dist >  30 || distance == -1) indicatorPointers[i].bmp.rotation -= 4;
						else if ( indicatorPointers[i].bmp.rotation < 0 ) indicatorPointers[i].bmp.rotation -= 4;

						//check if finnished
						if(indicatorPointers[i].bmp.rotation < minRotation + i*widthRotation)
						{
							currPos--;
						}

						//save distance
						distance = _dist;
					}
				}

				if(currPos == 0) nextPos = 0;

			}
			else
			{
				//move one to the right
				indicatorPointers[indicatorPointers.length - currPos-1].bmp.rotation += 4;
				if(indicatorPointers[indicatorPointers.length - currPos-1].bmp.rotation > (maxRotation - nextPos*widthRotation))
				{
					indicatorPointers[indicatorPointers.length - currPos-1].bmp.rotation = (maxRotation - nextPos*widthRotation);
					currPos = nextPos;
				}
			}
		}

	};

	this.finalize = function()
	{
		for(var i = 0 ; i < indicatorPointers.length ; i ++)
		{
			stage.removeChild(indicatorPointer.bmp);
		}
		indicatorPointers = new Array();

	}

	//move one to the right
	this.add = function(){
		nextPos++;
	}

	//reset
	this.reset = function(){
		nextPos = -1;
	}
	
}
