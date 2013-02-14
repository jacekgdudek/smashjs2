//////////////////////////////////////
//
//   main loop for the game
//////////////////////////////////

//setup timer and refresh time
var timer;
var refreshTime = 10;


timer = setInterval(function () {
	
	

	smoothInputs();
	imageProcessing();
	
	// Update the current scene
	var sceneComplete = scenes[currScene].update();
	
	// If the level is complete go to the next scene
	if (sceneComplete) { currScene++; }
	
	
}, refreshTime);

function smoothInputs() {
			//if input was not updated still update last position
			if(!inputArray[0].wasUpdated) 
			{
				inputArray[0].x = smoothing*inputArray[0].x+ (1-smoothing)*inputArray[0].lastx ;
				inputArray[0].y = smoothing*inputArray[0].y+ (1-smoothing)*inputArray[0].lasty ;
			}
			if(!inputArray[2].wasUpdated) 
			{
				inputArray[2].x = smoothing*inputArray[2].x+ (1-smoothing)*inputArray[2].lastx ;
				inputArray[2].y = smoothing*inputArray[2].y+ (1-smoothing)*inputArray[2].lasty ;
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
