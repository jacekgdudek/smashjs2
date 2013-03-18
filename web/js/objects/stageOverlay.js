function StageOverlay(_stage){

	var stage = _stage;

	var structure;

	var overlay;

	var blinkerReset, blinkerPause, minValue;

	
	//INIT======================================
	this.init = function(_structure)
	{
		overlay = new createjs.Bitmap(_structure.src);
		structure = _structure;

		minValue = _structure.min_value;

		overlay.alpha = minValue;

		blinkerReset = 0;
		blinkerPause = 0;


		stage.addChild(overlay);
	}

	//UPDATE====================================
	this.update = function(){

		//blink blibnk blink
		if(blinkerReset > structure.duration)
		{
			blinkerReset = 0;
			blinkerPause = 0;
			overlay.alpha = minValue;
		}
		else
		{
			blinkerReset++;
			if(blinkerPause > structure.pause)
			{
				//blibky blinky
				overlay.alpha = (Math.random()* (1 - structure.min_value)) + structure.min_value; // random value between 0 and 1;
				audioManager.playSoundAtVolume( structure.soundEffect , 1, false);
			}
			else
			{
				blinkerPause++;
			}
		}

	};

	//FINALIZE==================================
	this.finalize = function()
	{
		stage.removeChild(overlay);
	}

}
