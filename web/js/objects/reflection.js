function Reflection(_stage){

	var stage = _stage;

	var capture;
	
	//INIT======================================
	this.init = function()
	{
		var video = document.getElementById("live");
		capture = new createjs.Bitmap(video);

		capture.regX = 320;
		capture.regY = 240;
		(flipX ? capture.scaleX = -1*(800/640) : capture.scaleX = (800/640) )
		capture.scaleY = (600/480);
		capture.x = 400;
		capture.y = 300;
		stage.addChild(capture);
		capture.alpha = 0.4;
	}

	//FINALIZE==================================
	this.finalize = function()
	{
		stage.removeChild(capture);
	}

}

