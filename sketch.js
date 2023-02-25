let pg;
let sun; 
let cnv;
let mySound;


// create a 3D graphics object


let earth;
let earthSizeSlider;
let earthSize =50;
let earthSizeLabel;
let earthSizeSinCheckbox;
let earthSinChecked = false;

let earthAxisXSlider;
let earthAxisX;
let earthAxisXSinChecked=false;



let earthAxisYSlider;
let earthAxisY;
let earthAxisYSinChecked=false;

let earthAxisZSlider;
let earthAxisZ;
let earthAxisZSinChecked=false;

let xEarth =200;
let yEarth =0;
let zEarth =0;

let moon;
let caustic;
let jupiter;
time = 0;
let angle;
let sensitivity = 0.01;

// use the equation of a circle to calculate the x and y coordinates
// Check for BlobURL support
let blob = window.URL || window.webkitURL;
    if (!blob) {
        console.log('Your browser does not support Blob URLs :(');
                  
    }

let file = document.getElementById('file')


file.addEventListener('change', function(event){
 
  console.log('change on input#file triggered');
   const file = this.files[0],
    fileURL = blob.createObjectURL(file);
    console.log(fileURL)
   console.log(file);
   console.log('File name: '+file.name);
   console.log('File type: '+file.type);
   console.log('File BlobURL: '+ fileURL);
   //document.getElementById('audio').src = fileURL;
 

});

function preload() {
  sun = loadImage('./images/sun.jpg'); // load an image 
  earth = loadImage('./images/earth.jpg'); // load an image
  moon = loadImage('./images/moon.jpg'); // load an image
  caustic = loadImage('./images/CAUSTIC.JPG'); // load an image
  jupiter = loadImage('./images/JUPITER.jpg'); // load an image
  
  soundFormats('mp3', 'ogg');
 console.log(file.name)
  mySound = loadSound(fileURL)
}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  
  earthSizeSlider = createSlider(0, 100, earthSize, 1);
  earthSizeSlider.position(20, 60);
  earthSizeSlider.style('width', '100px');
  earthSizeLabel = createDiv('Earth Size');
  earthSizeLabel.position(20, 10);
 // earthSizeSlider.parent(earthSizeLabel);
    // Set the font size and color of the div
    earthSizeLabel.style('font-family', 'arial');
    earthSizeLabel.style('font-size', '18px');
    earthSizeLabel.style('color', 'white');
    earthSizeLabel.style('padding', '10px');
    earthSizeLabel.style('text-align', 'center');
    
earthSizeSinCheckbox = createCheckbox('Sin', false);
  earthSizeSinCheckbox.position(140, 40)
  earthSizeSinCheckbox.style('color', 'white');
  earthSizeSinCheckbox.style('font-family', 'arial');
 earthSizeSinCheckbox.changed(earthSizeSinCheckedEvent)
  
 earthAxisXSlider = createSlider(-1, 1, earthAxisX, 0.01);
 earthAxisXSlider.position(20, 140)
 earthAxisXSlider.style('width', '100px');
 earthAxisXLabel = createDiv('Earth Axis X');
 earthAxisXLabel.position(20, 100);
 earthAxisXLabel.style('font-family', 'arial');
 earthAxisXLabel.style('font-size', '18px');
 earthAxisXLabel.style('color', 'white');
 earthAxisXLabel.style('padding', '10px');
 earthAxisXLabel.style('text-align', 'center');
 earthAxisXSineCheckbox = createCheckbox('Sin', false);
 earthAxisXSineCheckbox.position(140, 140)
 earthAxisXSineCheckbox.style('color', 'white');
 earthAxisXSineCheckbox.style('font-family', 'arial');
 earthAxisXSineCheckbox.changed(earthAxisXSineCheckedEvent)


 earthAxisYSlider = createSlider(-1, 1, earthAxisX, 0.01);
 earthAxisYSlider.position(20, 200)
 earthAxisYSlider.style('width', '100px');
 earthAxisYLabel = createDiv('Earth Axis Y');
 earthAxisYLabel.position(20, 160);
 earthAxisYLabel.style('font-family', 'arial');
 earthAxisYLabel.style('font-size', '18px');
 earthAxisYLabel.style('color', 'white');
 earthAxisYLabel.style('padding', '10px');
 earthAxisYLabel.style('text-align', 'center');
 earthAxisYSineCheckbox = createCheckbox('Sin', false);
 earthAxisYSineCheckbox.position(140, 200)
 earthAxisYSineCheckbox.style('color', 'white');
 earthAxisYSineCheckbox.style('font-family', 'arial');
 earthAxisYSineCheckbox.changed(earthAxisYSineCheckedEvent)


 earthAxisZSlider = createSlider(-1, 1, earthAxisX, 0.01);
 earthAxisZSlider.position(20, 260)
 earthAxisZSlider.style('width', '100px');
 earthAxisZLabel = createDiv('Earth Axis Z');
 earthAxisZLabel.position(20, 220);
 earthAxisZLabel.style('font-family', 'arial')
 earthAxisZLabel.style('font-size', '18px');
 earthAxisZLabel.style('color', 'white');
 earthAxisZLabel.style('padding', '10px');
 earthAxisZLabel.style('text-align', 'center');
 earthAxisZSineCheckbox = createCheckbox('Sin', false);
 earthAxisZSineCheckbox.position(140, 260)
 earthAxisZSineCheckbox.style('color', 'white');
 earthAxisZSineCheckbox.style('font-family', 'arial');
 earthAxisZSineCheckbox.changed(earthAxisZSineCheckedEvent)


 earthPosXSlider = createSlider(-500, 500, xEarth, 0.01);
 earthPosXSlider.position(20, 320)
 earthPosXSlider.style('width', '100px');
 earthPosXLabel = createDiv('Earth Position X');
 earthPosXLabel.position(20, 280);
 earthPosXLabel.style('font-family', 'arial');
 earthPosXLabel.style('font-size', '18px');
 earthPosXLabel.style('color', 'white');
 earthPosXLabel.style('padding', '10px');
 earthPosXLabel.style('text-align', 'center');

 earthPosYSlider = createSlider(-500, 500, yEarth, 0.01);
 earthPosYSlider.position(20, 380)
 earthPosYSlider.style('width', '100px');
 earthPosYLabel = createDiv('Earth Position Y');
 earthPosYLabel.position(20, 340);
 earthPosYLabel.style('font-family', 'arial');
 earthPosYLabel.style('font-size', '18px');
 earthPosYLabel.style('color', 'white');
 earthPosYLabel.style('padding', '10px');
 earthPosYLabel.style('text-align', 'center');

 earthPosZSlider = createSlider(-500, 500, yEarth, 0.01);
 earthPosZSlider.position(20, 440)
 earthPosZSlider.style('width', '100px');
 earthPosZLabel = createDiv('Earth Position Z');
 earthPosZLabel.position(20, 400);
 earthPosZLabel.style('font-family', 'arial');
 earthPosZLabel.style('font-size', '18px');
 earthPosZLabel.style('color', 'white');
 earthPosZLabel.style('padding', '10px');
 earthPosZLabel.style('text-align', 'center');

 // create a 2D canvas
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(canvasPressed);
  // create a 3D graphics object with the same size as the canvas
  pg = createGraphics(windowWidth, windowHeight, WEBGL);
}

function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  mySound.play();
}
function earthSizeSinCheckedEvent(){
  if(earthSizeSinCheckbox.checked()){
 earthSinChecked=true;} else {
earthSinChecked=false;}
 }

 function earthAxisXSineCheckedEvent(){
  if(earthAxisXSineCheckbox.checked()){
 earthAxisXSinChecked=true;} else {
earthAxisXSinChecked=false;}
 }

 function earthAxisYSineCheckedEvent(){
  if(earthAxisYSineCheckbox.checked()){
    earthAxisYSinChecked=true;} else {
   earthAxisYSinChecked=false;}
}

function earthAxisZSineCheckedEvent(){
  if(earthAxisZSineCheckbox.checked()){
    earthAxisZSinChecked=true;} else {
   earthAxisZSinChecked=false;}
}


function draw() {
  let angle = map(time, 0, 360, 0, TWO_PI); // map the time variable to a range of 0 to 2*PI
  
  if(earthSinChecked){
    earthSize = sin(angle)*earthSizeSlider.value()
  }else{ earthSize = earthSizeSlider.value()}
 
   if (earthAxisXSinChecked){
     earthAxisX = sin(angle);
     
    
   }else{ earthAxisX = earthAxisXSlider.value();}

   if (earthAxisYSinChecked){
    earthAxisY = sin(angle);
   
  }else{ earthAxisY = earthAxisYSlider.value();}
  
  if (earthAxisZSinChecked){
    earthAxisZ = sin(angle);
  console.log(earthAxisZ)
  }else{ earthAxisz = earthAxisZSlider.value();}



  earthAxisZ = earthAxisZSlider.value();
  
  xEarth = earthPosXSlider.value();
  yEarth = earthPosYSlider.value();
  zEarth = earthPosZSlider.value();

  //console.log(Math.sin(angle))// let xEarth = xEarthSunDistance * Math.sin(angle); 
  // // let zEarth = zEarthSunDistance * Math.cos(angle); // calculate the y coordinate using sine
  // let xEarth = 250;
  // let yEarth=0;
  // let zEarth = 0;
  let EarthPosition = createVector(xEarth, yEarth, zEarth);
  let EarthAxis = createVector(earthAxisX, earthAxisY,earthAxisZ);

  let xMoon = xEarth 
  let zMoon = zEarth   


  let xCaustic = 1.5*xEarth;
  let yCaustic = 1.5*xEarth;
  let zCaustic = 1.5*zEarth;

  time++;

  // clear the background of the canvas
  background('#000000');
   //lights()
  //pg.ambientLight(255)
  pg.clear()
  // draw a sphere on the 3D graphics object
  pg.background('#000000');


  // create a light source

  pg.lights()
  //pg.pointLight(255,255,255, distance, 0, 0); // create a point light with a white color at the position of the second sphere
  //pg.ambientLight(255,255,255); // create an ambient light
  // draw the first sphere

//sun
  pg.push(); // save the current transformation state
  pg.normalMaterial();
  pg.texture(sun)
  pg.sphere(100); // draw the sphere
  pg.pop(); // restore the previous transformation state


  
//earth
  // draw the second sphere
  pg.push(); // save the current transformation state
  pg.translate(EarthPosition);
  pg.rotate(angle, EarthAxis);  
  pg.normalMaterial();
  //pg.rotateY(angle);
  pg.texture(earth); // apply the image as a texture
  pg.sphere(earthSize); // draw the sphere
  pg.pop(); // restore the previous transformation state

// //CAUSTIC
// pg.push();
// pg.normalMaterial();
// pg.translate(xCaustic, yCaustic, zCaustic);
// pg.texture(caustic);
// pg.rotateY(angle);
// pg.sphere(55);
// pg.pop();

// // draw the moon on the 3D graphics object
// pg.push();
// pg.noStroke();
// pg.texture(moon); // apply the moon image as a texture
// pg.translate(xEarth/2, zEarth/2, 0); // move the moon to the position of the earth
// pg.rotateZ(angle); // rotate the moon around the earth by the angle
// //pg.translate(moonXdist, 0, moonZdist); // move the moon to the desired distance from the earth
// pg.sphere(10); // draw a sphere with a radius of 10
// pg.pop();

//   // draw the second sphere
//   pg.push(); // save the current transformation state
//   pg.normalMaterial();
//   pg.rotateY(angle);  
//   pg.translate(xEarth+500, 0, zEarth+500);
//   pg.texture(jupiter); // apply the image as a texture
//   pg.sphere(300); // draw the sphere
//   pg.pop(); // restore the previous transformation state

//  //jupiter
//   pg.push();
//   pg.noStroke();
//   pg.texture(jupiter); // apply the jupiter image as a texture
//   pg.translate(xEarth+100, 0, zEarth+100);
//   pg.rotateY(angle);
//   pg.sphere(50)

  // display the 3D graphics object on the canvas
  background(220)
  image(pg, 0, 0);
  // check if any key is pressed





  
  if (keyIsPressed) {
    // get the current camera of the 3D graphics object
    let cam = pg._renderer._curCamera;

    // check which key is pressed and adjust the orbit accordingly
    if (keyIsPressed) {
      // orbit up
      if (keyIsDown(87) ) { // 87 is the key code for 'w'
        pg.rotateX(-sensitivity)
      }
      // orbit down
      if (keyIsDown(83) ) { // 83 is the key code for 's'
        pg.rotateX(sensitivity)
      }
      // orbit left
      if (keyIsDown(65) ) { // 65 is the key code for 'a'
        pg.rotateY(-sensitivity);
      }
      // orbit right
      if (keyIsDown(68) ) { // 68 is the key code for 'd'
        pg.rotateY(sensitivity);
      }
      // zoom in
      if (keyIsDown(81)) { // 81 is the key code for 'q'
        pg.scale(1 + sensitivity);
      }
      // zoom out
      if (keyIsDown(69)) { // 69 is the key code for 'e' 
        pg.scale(1 - sensitivity);
      }
    }
  }


  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

  }
}
