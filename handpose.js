let handpose;
let video;
let predictions = [];
let hand;
let posx=null;
let posy=null;
let entra=null;
let dots = [];
let kusama;
let x;
let y;
let display;
let handOpen = false;
let activeDot = false;
let cnv;

function centerCanvas() {
let x = (windowWidth - width) /2;
let y = (windowHeight - height) /2;
cnv.position(x,y);
}

function setup() {
  cnv = createCanvas(640, 600);
  video = createCapture(VIDEO);
  video.size(width, height);
  
  centerCanvas();

  handpose = ml5.handpose(video, modelReady);

  handpose.on("predict",results => {

    if(posx!=null)
      ellipse(posx, posy, 50);
        
    predictions = results;
  });

  video.hide();
}
function windowResized(){
  centerCanvas();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  // background("#FF00FF");
  background("transparent");
  // background("yellow");
  // image(video, 0, 0, width, height);
  //move image by the width of image to the left
  translate(video.width, 0);
  //then scale it by -1 in the x-axis
  //to flip the image
  scale(-1, 1);
  //draw video capture feed as image inside p5 canvas
  // image(video, 0, 0);
  if(dots) {
    //console.log(dots);
      for (dot of dots) {
                  
             dot.display();
      }
  }
  else {
    console.log("no dots yet");
  }
  
  
 drawKeypoints();
} 
function drawKeypoints() {
    //////////////////DATA LAYER
    let hand = null;
    let middle = null;
    let palmBase = null;
    let middleBasePoint = null;
    let palmBasePoint = null;
    let dot=null;
  
  
  if(predictions.length > 0){
    hand = predictions[0];
    middle = hand.annotations.middleFinger;
    palmBase = hand.annotations.palmBase;

    middleBasePoint = middle[0];
    middleTopPoint = middle[3];
    palmBasePoint = palmBase [0];

    push();
    
    ///DRAW LAYER
    
    let yTrigger = middleTopPoint[1] - palmBasePoint[1];
    let triggerValue = -100;
    let anchorPoint = null;
    let staStaticPoint = null;

    if (triggerValue > yTrigger){
    anchorPoint= [ middleBasePoint[0], middleBasePoint[1] ];
      handOpen = true;
    }
    if (triggerValue < yTrigger){   
    staStaticPoint= [ middleBasePoint[0], middleBasePoint[1] ];                 
    }
    console.log("ACTIVEVVVV");
    console.log(activeDot);
    
    if (anchorPoint != null && handOpen == true && activeDot == false){
      console.log("new dot");
      kdot = renderDot(anchorPoint);
      kdot.display();
      activeDot = kdot;
    }
    if (activeDot && anchorPoint !=null){
      console.log("update dot");

      activeDot.updateCoords(anchorPoint[0], anchorPoint[1]);
      activeDot.display();
    }
    if (activeDot && staStaticPoint != null){ 
      console.log("push dot");   
      activeDot = handClosed(activeDot);
    }
  }
  
  
  //////////////RENDER LAYER
  
function renderDot(anchorPoint){
   x = anchorPoint[0];
   y = anchorPoint[1];
  console.log("open");
  kusama = new Kusama(x, y, 80);
  
  handOpen = false;
  return kusama;
}
function handClosed(activeDot){
    console.log("ACTIVE DOT!!!")
    console.log(activeDot);
    dots.push(activeDot);
    activeDot = false;
    return activeDot;
  }
}