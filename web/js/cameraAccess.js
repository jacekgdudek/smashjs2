"use strict";

///////////////////////////////////////////////////////////////
//
//    define cameraAccess
////////////////////////////////////////////////////
//init variables
var videoStream=null;
var video = document.getElementById('live');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
										   
if (window.webkitURL) console.log("webkitURL is go!");
  
var localStream;

//check for camera
window.onload = function ()  {

  console.log("asking for local stream!");
  //Ask for local streams to be prepared, display self view
  //if (navigator.webkitGetUserMedia) navigator.webkitGetUserMedia({video:true}, gotStream, noStream);
  if (navigator.webkitGetUserMedia) navigator.webkitGetUserMedia({video:true}, gotStream, noStream);
  else {
    console.log("webkitGetUserMedia not available - you're not using Chrome...");
    console.log("TODO: add support for other browsers!");
  }

  // Program entry point
  init();
};

//react if got Stream
function gotStream(stream) {
  //document.getElementById("live").src = window.webkitURL.createObjectURL(localStream);
  video.src = webkitURL.createObjectURL(stream);
  video.classList.add("grayscale");
  video.classList
  video.play();
  console.log("video.src");
};

//react if no stream
function noStream(err) {
  console.log("no stream available!");
};