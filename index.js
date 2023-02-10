//Size of the canvas where animations are rendered
const canvasWidth = 1000;
const canvasHeight = 850;

//Position where frame will be drawn
let xAxis = 325;
let yAxis = 150;

//Position on the image to be animated
let srcX;
let srcY;

//size of the sprite.png
const sheetWidth = 832;
const sheetHeight = 1344;

//number of rows & columns in the sprite.png
const columns = 13;
const rows = 21;
//Defines the row to use to animate corresponding movement.
let trackLeft = 9;
let trackRight = 11;
let trackUp = 8;
let trackDown = 10;
let movingLeft = false;
let movingRight = false;
let movingUp = false;
let movingDown = true;
//Height and width of each frame of animation = 64
const width = sheetWidth / columns;
const height = sheetHeight / rows;

// Frame that will be rendered first (measured by the position on x-axis)
let currentFrame = 0;

const tree = new Image();
tree.src = "tree.png";
const character = new Image();
character.src = "anna.png";

//defines element on html to render the animations
const canvas = document.getElementById("canvas");

//Sets height and width of animation canvas
canvas.width = canvasWidth;
canvas.height = canvasHeight;

//has animation images render as a 2d image
const context = canvas.getContext("2d");

//Moves character and sets appropriate animation
function charMove(event) {
  if (!event.repeat) {
    console.log(event);
    switch (event.keyCode) {
      case 37: //left arrow
      case 65: // a
        console.log("left");
        movingLeft = true;
        movingRight = false;
        movingUp = false;
        movingDown = false;
        // xAxis -= 2;
        // characterStart();
        break;
      case 38: //up arrow
      case 87: // w
        console.log("up");
        movingLeft = false;
        movingRight = false;
        movingUp = true;
        movingDown = false;
        // yAxis -= 2;
        // characterStart();
        break;
      case 39: //right arrow
      case 68: // d
        console.log("right");
        movingLeft = false;
        movingRight = true;
        movingUp = false;
        movingDown = false;
        // xAxis += 2;
        // characterStart();
        break;
      case 40: //down arrow
      case 83: // s
        console.log("down");
        movingLeft = false;
        movingRight = false;
        movingUp = false;
        movingDown = true;
        // yAxis += 2;
        // characterStart();
        break;
      default:
        return;
    }
    characterStart();
  }
}

//updates the displayed frame and removes the previously displayed frame
function updateFrame() {
  context.clearRect(xAxis, yAxis + 10, width, height);
  currentFrame = ++currentFrame % 5; //9 is the number of columns to be animated
  srcX = currentFrame * width;
  if (movingLeft === true) {
    xAxis -= 4;
    srcY = trackLeft * height; //right: 704 down: 640 left:576 up:512
  } else if (movingRight === true) {
    xAxis += 4;
    srcY = trackRight * height;
  } else if (movingUp === true) {
    yAxis -= 4;
    srcY = trackUp * height;
  } else {
    yAxis += 4;
    srcY = trackDown * height;
  }
  //   drawTree();
}

// context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

function drawTree() {
  //   window.onload = function () {
  // context.drawImage(character, srcX, srcY, width, height, xAxis, yAxis, width, height);
  // clearInterval(myVar);
  context.drawImage(tree, 25, 0, 100, 100);
  context.drawImage(tree, 250, 250, 100, 100);
  context.drawImage(tree, 150, 100, 100, 100);
  context.drawImage(tree, 75, 90, 100, 100);
  context.drawImage(tree, 30, 75, 100, 100);
  context.drawImage(tree, 400, 120, 100, 100);
  //   };
}

//draws the sprite
function drawSprite() {
  updateFrame();
  drawTree();
  context.drawImage(
    character,
    srcX,
    srcY,
    width,
    height,
    xAxis,
    yAxis,
    width,
    height
  );
}

var walkingAnimationInterval; // = setInterval(characterStart, 125);

function characterStart() {
  // drawSprite();
  if (walkingAnimationInterval) clearInterval(walkingAnimationInterval);
  walkingAnimationInterval = setInterval(drawSprite, 125); //sets the speed of sprite animation
}

function chacterStop(event) {
  //if direction arrow is not pressed do not clear the interval
  switch (event.keyCode) {
    case 37: //left arrow
    case 65: // a
    case 38: //up arrow
    case 87: // w
    case 39: //right arrow
    case 68: // d
    case 40: //down arrow
    case 83: // s
      clearInterval(walkingAnimationInterval);
      break;
    default:
      return;
  }
}
window.onload = function () {
  drawTree();
  // characterStart();
  drawSprite();
};

//key down event listener
window.addEventListener("keydown", charMove);
window.addEventListener("keyup", chacterStop);
