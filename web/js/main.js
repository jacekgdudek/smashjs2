//////////////////////////////////////
//
//   main loop for the game
//////////////////////////////////

//setup timer and refresh time
var timer;
var refreshTime = 10;

timer = setInterval(function () {
	if(loadedAssets && moduleLoaded)
	{

		smoothInputs();
		if(moduleLoaded)
		{
			imageProcessing();
		}

		// Update the current scene
		if (typeof scenes[currScene] !== 'undefined') {
			//update scene
			var sceneComplete = scenes[currScene].update();
			
			//updateGUI()
			updateGUI();

			//update transitions
			transitionsManager.update();

			scenes[currScene].stage.update();

		}

		//process collision
		collide();
		
		//process events
		handleEvents();
		// If the level is complete go to the next scene
		//if (sceneComplete) { currScene++; }

	}
	
}, refreshTime);

function smoothInputs() {
			//if input was not updated still update last position
			if(!inputArray[0].wasUpdated) 
			{
				inputArray[0].x = smoothing*inputArray[0].x+ (1-smoothing)*inputArray[0].lastx ;
				inputArray[0].y = smoothing*inputArray[0].y+ (1-smoothing)*inputArray[0].lasty ;
				//angle
				inputArray[0].startingAngleDelay++;
				if(inputArray[0].startingAngleDelay > 20) inputArray[0].startingAngle = 9999;
			}
			if(!inputArray[2].wasUpdated) 
			{
				inputArray[2].x = smoothing*inputArray[2].x+ (1-smoothing)*inputArray[2].lastx ;
				inputArray[2].y = smoothing*inputArray[2].y+ (1-smoothing)*inputArray[2].lasty ;
				//angle
				inputArray[2].startingAngleDelay++;
				if(inputArray[2].startingAngleDelay > 20) inputArray[2].startingAngle = 9999;
			}
};

function imageProcessing() {
	ctx.drawImage(video, 0, 0, 640, 480);
	//video
	var imgData=ctx.getImageData(0,0,640,480);
	var j = 0;
	for(var i = 0; i < imgData.data.length; i+=4) {
		var r = imgData.data[i];
		var g = imgData.data[i+1];
		var b = imgData.data[i+2];
		var brightness = (3*r+4*g+b)>>>3;
		imgData.data[j] = brightness;
		j++;
		//imgData.data[i] = brightness;
		//imgData.data[i+1] = brightness;
		//imgData.data[i+2] = brightness;
	}
	//ctx.putImageData(imgData,0,0);
	//canvas.classList.add("grayscale");
	var imageStr = "";
	
	//console.log(imageStr);
	//updateStatus(imageStr);
	//popPixels(imageStr);
	
	var imageBuffer = new ArrayBuffer(j);//imgData.data.length);
	var imageBufferView = new Uint8Array(imageBuffer);
	for(var i = 0 ; i < j/*imgData.data.length*/ ; i++)
	{
		imageBufferView[i] = imgData.data[i];
	}
	//imgData.arrayBuffer = new ArrayBuffer(imgData.data.length);
	popPixels(imageBuffer);//imgData.data);
	imageBuffer = null;
	imageBufferView = null;
	
	//imgData.data();
	//Canvas2Image.saveAsPNG(canvas);
};

function updateMessage()
{
	if(messageGUI.delay > 0)
	{
		messageGUI.delay--;
	}
	else
	{
		messageGUI.bg.visible = false;
		messageGUI.text.visible = false;
	}
}

function updateHeat()
{
	var gap = 0;
	if(!heat.armed) {
		if(heat.nextValue != heat.value) {
			gap = Math.floor((heat.nextValue - heat.value)/2);
			//determine direction
			var direction = ( heat.nextValue > heat.value );
			//validate gap
			if((gap < 1 && direction) || (gap > -1 && !direction)) gap = (direction ? 1 : -1)*1;
			//determine new value
			var newValue = heat.value + gap;

			//change width of bar
			scenes[currScene].stage.removeChild(heat.bar, heat.text);
			heat.bar = null;
			heat.bar = new createjs.Shape();
			heat.bar.graphics	.beginLinearGradientFill(["#F66","#FAA","#F66","#D00"], [0,0.3,0.6, 1], 0, 0, 0, heat.height-6)
						.drawRect(	heat.x + 10, 
								heat.y+3, 
								(newValue/heat.maxHeat)*(heat.width-20), 
								heat.height-6);
			scenes[currScene].stage.addChild(heat.bar, heat.text);

			heat.value = newValue;
		}
	} else {
		switch(heat.state) {
			//slide the time in
			case 0:
				if(heat.risk < heat.maxRisk) {
					heat.risk++;

				} else {
					heat.riskOffset++;
					heat.time++;
					if(heat.time > heat.noRiskTime) {
						heat.state = 1;
					}
				}

			break;
			//run time
			case 1:
				gap = 0.05;
				heat.time -= gap;
				if(heat.time < 0) {
					addEvent("FINNISHED_JOB", false);
				}
			break;
		}

		scenes[currScene].stage.removeChild(heat.bg, heat.bar,heat.modules, heat.text);
		heat.bar = null;
		heat.modules = null;
		heat.modules = new createjs.Shape();
		heat.bar = new createjs.Shape();

		//	Awesome drawing function, 
		// 	Although, what do all those numbers mean? 
		// 	http://stackoverflow.com/questions/47882/what-is-a-magic-number-and-why-is-it-bad 
		heat.bar.graphics	.beginLinearGradientFill(["#66F","#AAF","#66F","00D"], [0,0.3,0.6, 1], 0, 0, 0, heat.height-6)
					.drawRect(	heat.x + 10 + ((heat.value + (heat.maxTime-heat.time)) /heat.maxHeat)*(heat.width-20), 
							heat.y+3, 
							(heat.time/heat.maxHeat)*(heat.width-20), 
							heat.height-6)
					.beginLinearGradientFill(["#F66","#FAA","#F66","D00"], [0,0.3,0.6, 1], 0, 0, 0, heat.height-6)
					.drawRect(	heat.x + 10, 
							heat.y+3, 
							(heat.nextValue/heat.maxHeat)*(heat.width-20), 
							heat.height-6);

		//draw risk
		heat.modules.graphics	.beginLinearGradientFill(["#AAA","#FFF","#AAA","555"], [0,0.3,0.6, 1], 0, 0, 0, heat.height-6)
					.drawRect(	heat.x + 10 + ((heat.value + heat.maxTime-heat.risk-heat.riskOffset) /heat.maxHeat)*(heat.width-20), 
							heat.y+3, 
							(heat.risk/heat.maxHeat)*(heat.width-20), 
							heat.height-6);

		scenes[currScene].stage.addChild(heat.bg, heat.bar,heat.modules, heat.text);
	}
	
}


function updateCredits()
{
	var gap = 9;
	if(credits.nextValue != credits.value)
	{
		gap = Math.floor((credits.nextValue - credits.value)/2);
		//determine direction
		var direction = ( credits.nextValue > credits.value );
		//determine new value
		if((gap < 1 && direction) || (gap > -1 && !direction)) gap = (direction ? 1 : -1)*1;
		var newValue = credits.value + gap;
		var lastDigits = new Array();
		var newDigits = new Array();

		//determine particular values for digits
		for(var i = 5; i >= 0 ; i --)
		{
			lastDigits.push(Math.floor((credits.value%Math.pow(10,(i+1)))/Math.pow(10,i)));
			newDigits.push(Math.floor((newValue%Math.pow(10,(i+1)))/Math.pow(10,i)));
		}
		
		//compare and change digits
		for(var i = 0; i < 6 ; i ++)
		{
			if(lastDigits[i] != newDigits[i] )
			{
				var index = i+1;
				if(index>3) index++;
				scenes[currScene].stage.removeChild(credits.numbers[index].bmp);

				var x = credits.numbers[index].bmp.x;
				var y = credits.numbers[index].bmp.y;
				credits.numbers[index].bmp = credits.subelements[newDigits[i]].bmp.clone();
				credits.numbers[index].bmp.x = x;
				credits.numbers[index].bmp.y = y;
				scenes[currScene].stage.addChild(credits.numbers[index].bmp);
			}
		}

		credits.value = newValue;

	}
}
