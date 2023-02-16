// create a 3D graphics object
let pg;
let sun;
let earth;
let moon;
let xEarthSunDistance = 300;
let yEarthSunDistance = 0;
let zEarthSunDistance = 300;
let xEarthMoonDistance = 150;
let zEarthMoonDistance = 150;
time = 0;
let sensitivity = 0.01;

// use the equation of a circle to calculate the x and y coordinates



function preload() {
  sun = loadImage('./images/sun.jpg'); // load an image 
  earth = loadImage('./images/earth.jpg'); // load an image
  moon = loadImage('./images/moon.jpg'); // load an image
  caustic = loadImage('./images/CAUSTIC.JPG'); // load an image
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  // create a 2D canvas
  createCanvas(windowWidth, windowHeight);

  // create a 3D graphics object with the same size as the canvas
  pg = createGraphics(windowWidth, windowHeight, WEBGL);
}

function draw() {
  let angle = map(time, 0, 360, 0, TWO_PI); // map the time variable to a range of 0 to 2*PI
  let xEarth = xEarthSunDistance * Math.sin(angle); 
  let zEarth = zEarthSunDistance * Math.cos(angle); // calculate the y coordinate using sine
  // create a variable to store the sensitivity of the orbit

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
  pg.rotateY(angle);
  pg.texture(sun)
  pg.sphere(100); // draw the sphere
  pg.pop(); // restore the previous transformation state

//earth
  // draw the second sphere
  pg.push(); // save the current transformation state
  pg.normalMaterial();
  pg.rotateY(angle);  
  pg.translate(xEarth, 0, zEarth);
  pg.texture(earth); // apply the image as a texture
  pg.sphere(50); // draw the sphere
  pg.pop(); // restore the previous transformation state

//CAUSTIC
pg.push();
pg.normalMaterial();
pg.translate(xCaustic, yCaustic, zCaustic);
pg.texture(caustic);
pg.rotateY(angle);
pg.sphere(55);
pg.pop();

// draw the moon on the 3D graphics object
pg.push();
pg.noStroke();
pg.texture(moon); // apply the moon image as a texture
pg.translate(xEarth/2, 0, zEarth/2); // move the moon to the position of the earth
pg.rotateZ(angle); // rotate the moon around the earth by the angle
//pg.translate(moonXdist, 0, moonZdist); // move the moon to the desired distance from the earth
pg.sphere(10); // draw a sphere with a radius of 10
pg.pop();

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
      if (keyIsDown(87) || keyIsDown(UP_ARROW)) { // 87 is the key code for 'w'
        pg.rotateX(-sensitivity)
      }
      // orbit down
      if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // 83 is the key code for 's'
        pg.rotateX(-sensitivity)
      }
      // orbit left
      if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // 65 is the key code for 'a'
        pg.rotateY(-sensitivity);
      }
      // orbit right
      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // 68 is the key code for 'd'
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

