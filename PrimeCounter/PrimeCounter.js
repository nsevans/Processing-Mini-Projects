
let curNumber;
let curRow;
let maxNumber;

let primeList;

let pixelSize;

let gridWidth, gridHeight;

function setup() {
    var canvas = createCanvas(1500, 1000);
    canvas.parent("canvasDiv");
    background(0);
    
    pixelSize = 2;

    gridWidth = width / pixelSize;
    gridHeight = height / pixelSize;

    curNumber = 1;
    curRow = 0;
    maxNumber = width * height / (pixelSize * pixelSize);

    primeList = [];
    
    stroke(0, 155, 0);
    fill(0, 255, 0);
}
function draw() {

    if(curNumber <= maxNumber){
        if(isPrime(curNumber)) {
            let pos = calculatePosition(curNumber);
            rect(pos.x,pos.y,pixelSize,pixelSize);
        }
        if((curNumber * pixelSize) % width == 0) {
            curRow++;
        }
        updateDisplayData();
        curNumber++;
    }
}

function isPrime(num) {
    if(num % 2 == 0){
        return false;
    }

    for(let i = 2; i <= num/2; i++) {
        if(num%i==0) {
            return false;
        }
    }
    return true;
}

function calculatePosition(num) {
    let pos = createVector(0,0);
    pos.x = (curNumber * pixelSize) % width;
    pos.y = pixelSize * curRow;
    return pos
}

function updateDisplayData() {
    document.getElementById("iterations").innerHTML = "Pixel Index: "+curNumber+"/"+maxNumber;
}