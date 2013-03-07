///////////////////////////////////////
//
//        Transitions between scenes
/////////////////////////////////////

//-----------------types of transitions
var TransitionType = {
	'CROSS_FADE':0,
	'FADE_IN_OUT':1,
	'OPEN_SAFE':2
};


function TransitionsManager(){
	var scene1, scene2;
	var type;
	var active = false;
	var maxTime = 0;
	var time = 0;
	var bg;

	//--------------------------------INIT
	this.transition = function(scene1, scene2, type, time)
	{
		this.scene1 = scene1;
		this.scene2 = scene2;
		if(typeof type === 'undefined') this.type = TransitionType.CROSS_FADE;
			else this.type = type;
		if(typeof time === 'undefined') this.maxTime = 40;
			else this.maxTime = time;
		this.time = 0;
		this.active = true;
		//this.tempStage = new createjs.Stage("game_canvas");

		this.initScenes();
	};

	this.initScenes = function()
	{
		for(var i = 0; i < this.scene1.visuals.length ; i ++)
		{
		 	this.scene2.stage.addChild(this.scene1.visuals[i].bitmap);
		 	this.scene1.visuals[i].bitmap.alpha = 1;
		// 	this.tempStage.addChild(this.scene1.visuals[i].bitmap);
		}
		for(var i = 0; i < this.scene2.visuals.length ; i ++)
		{
			switch(this.type)
			{
				case 0:
					this.scene2.visuals[i].bitmap.alpha = 1;
				break;
				case 1:
					this.scene2.visuals[i].bitmap.alpha = 0;
				break;
				case 2:
					this.scene2.visuals[i].bitmap.alpha = 1;
				break;
			}
			
			//this.tempStage.addChild(this.scene2.visuals[i].bitmap);
		}

		this.bg = new createjs.Shape();
		this.bg.graphics.beginStroke("#F00").beginFill("#000").drawRect(0, 0, 800, 600)
		this.scene2.stage.addChildAt(this.bg,0); 
	}

	//---------------------------------UPDATE
	this.update = function()
	{
		if(this.active)
		{
			//update time
			this.time++;
			//finnish if ended;
			if(this.time > this.maxTime)
			{
				this.finalize();
				this.active = false;
			}

			switch(this.type)
			{
				case TransitionType.CROSS_FADE:
					this.updateCrossFade();
				break;
				case TransitionType.FADE_IN_OUT:
					this.updateFadeInOut();
				break;
				case TransitionType.OPEN_SAFE:
					this.updateOpenSafe();
				break;
				default:
					console.log("Failed to run transition");
					this.active = false;
				break;
			}
		}
	};

	this.updateOpenSafe = function()
	{

	};


	this.updateCrossFade = function()
	{
		for(var i = 0; i < this.scene1.visuals.length ; i ++)
		{
		 	this.scene1.visuals[i].bitmap.alpha = (this.maxTime - this.time)/this.maxTime;
		}
	};

	this.updateFadeInOut = function()
	{
		var fadeIn = false;
		for(var i = 0; i < this.scene1.visuals.length ; i ++)
		{
			var newAlpha = (this.maxTime/2 - this.time)/(this.maxTime/2);
			if(newAlpha > 0)
			{
				this.scene1.visuals[i].bitmap.alpha = newAlpha;
			}
			else
			{
				fadeIn = true;
				break;
			}
		 	
		}

		if(fadeIn)
		{
			for(var i = 0; i < this.scene2.visuals.length ; i ++)
			{
				var newAlpha = (this.time- this.maxTime/2)/(this.maxTime/2);
				if(newAlpha >1) newAlpha = 1;
				this.scene2.visuals[i].bitmap.alpha = newAlpha;
			}
		}
	};


	//----------------------------FINALIZE
	this.finalize = function()
	{
		for(var i = 0; i < this.scene1.visuals.length ; i ++)
		{
			this.scene1.visuals[i].bitmap.alpha = 1;
		 	this.scene2.stage.removeChild(this.scene1.visuals[i].bitmap);
		}
		//this.scene1.finalize();

		for(var i = 0; i < this.scene2.visuals.length ; i ++)
		{
			this.scene2.visuals[i].bitmap.alpha = 1;
			//this.tempStage.removeChild(this.scene2.visuals[i].bitmap);
			//this.scene2.stage.addChild(this.scene2.visuals[i].bitmap);
		}
		this.scene2.stage.removeChild(this.bg);//init(this.scene2);
	}
};