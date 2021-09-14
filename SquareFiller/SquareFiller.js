
let drawnSquares;   // Array containing the positions and size of all squares on the screen

let currentSquareCount; // Current number fo square drawn
let currentSize;        // Current size of square being drawn
let minSize;            // Smallest size a square can be
let buffer;             // Space that needs to be between squares
let bufferSlider;       // Slider to control how small or large the buffer is

let maxSquares;         // Max number of squares drawn to screen
let maxDrawTries;       // Max number of times a square can be attempted to be drawn

let squareShrinkRate;   // Speed at which the squares being drawn shrink

let currentColorMode;   // The current colormode for the squares: RGB or HSB

function setup() {
    var canvas = createCanvas(900,600);
    canvas.parent("canvasDiv");
    background(0);

    currentColorMode = "HSB";
    colorMode(HSB)

    currentSquareCount = 0;
    currentSize = width/4;
    minSize = 5;
    bufferSlider = document.getElementById("bufferSlider")
    buffer = parseFloat(bufferSlider.value);

    maxSquares = 5000;
    maxDrawTries = 50;
    squareShrinkRate = 1.002;

    drawnSquares = createEmptyArray(maxSquares);
}

function draw() {
    
    buffer = parseFloat(bufferSlider.value);
    currentColorMode = document.querySelector('input[name="colorMode"]:checked').value;
    if(currentColorMode === "RGB") {
        colorMode(RGB);
    }
    else {
        colorMode(HSB);
    }

    if(currentSquareCount < maxSquares) {
        // Generate random position for the square
        let x = random(0,width);
        let y = random(0,height);

        let currentTries = 0;
        let squareFits = false;
        
        // Loop unitl the square fits or it's tried enough times
        while(!squareFits && currentTries < maxDrawTries) {  

            if(!checkCollision(x,y)) {
                // No collision for this position, exit loop
                squareFits = true;
            }else {
                // There was a collision, try again with new position
                x = random(0,width);
                y = random(0,height);
                currentTries++;
            }
        }

        if(currentTries < maxDrawTries) {
            // Save square data
            let data = [x, y, currentSize];
            drawnSquares[currentSquareCount] = data;

            // Generate random color for the square
            if(currentColorMode === "RGB") {
                console.log("RGB")
                let r = random(25,255); // Red
                let g = random(25,255); // Green
                let b = random(25,255); // Blue
                
                // Draw square to screen
                fill(r, g, b);
                strokeWeight(3);
                stroke(r-25, g-25, b-25);
            }
            else {
                console.log("HSB")
                let h = random(1,360); // Hue
                let s = 100;           // Saturation
                let b = 100;           // Brightness

                // Draw square to screen
                fill(h, s, b);
                strokeWeight(3);
                stroke(h, s, b/1.5);
            }
            
            square(x,y,currentSize);
            currentSquareCount++;
        }
        
        // Update square size
        currentSize /= squareShrinkRate;
        if(currentSize < minSize) {
            currentSize = minSize;
        }
    }
}

function checkCollision(x, y) {

    for(let i=0; i<currentSquareCount; i++) {

        // Get position and size of current checking square
        let otherX = drawnSquares[i][0];
        let otherY = drawnSquares[i][1];
        let otherS = drawnSquares[i][2];

        let s = currentSize;
        
        // Type 1 Collision - Top Left Corner
        if((x + s >= otherX - buffer && x + s <= otherX + otherS + buffer) &&
        (y + s >= otherY - buffer && y + s <= otherY + otherS + buffer)){
            return true;
            break;
        
        // Type 2 Collision - Top Right Corner
        }else if((x >= otherX - buffer && x <= otherX + otherS + buffer) &&
        (y + s >= otherY - buffer && y + s <= otherY + otherS + buffer)){
            return true;
            break;
        
        // Type 3 & 5 Collision - Center & Bottom Right Corner
        }else if((x >= otherX - buffer && x <= otherX + otherS + buffer) &&
        (y >= otherY - buffer && y <= otherY + otherS + buffer)){
            return true;
            break;
        
        // Type 4 Collision - Bottom Left Corner
        }else if((x + s >= otherX - buffer && x + s <= otherX + otherS + buffer) &&
        (y >= otherY - buffer && y <= otherY + otherS + buffer)){
            return true;
            break; 
        }
    }
}

function createEmptyArray(size) {
    let array = new Array(size);
    for(let i=0; i<size; i++) {
        // Store the x and y position as well as the length of a side
        array[i] = new Array(3);
    }
    return array;
}

function restartSimulation() {
    background(0);
    drawnSquares = createEmptyArray(maxSquares);
    currentSquareCount = 0;
    currentSize = width/3;

    currentColorMode = document.querySelector('input[name="colorMode"]:checked').value;
    if(currentColorMode === "RGB") {
        colorMode(RGB);
    }
    else {
        console.log(currentColorMode);
        colorMode(HSB);
    }
}