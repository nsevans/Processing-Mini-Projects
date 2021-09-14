
let cornerPositions;
let curX, curY;
let prevX, prevY;

let curCornerCount;
let newCornerCount;
let minCornerCount;
let maxCornerCount;

let pointSize;
let cornerSize

let iterations, maxIterations;

let diceCount;

let multiplier, divider;

function setup() {
    var canvas = createCanvas(600,600);
    canvas.parent("canvasDiv");

    setupData();
}

function draw() {

    if(iterations <= maxIterations) {
        drawNewPoint();
        updateDisplayData();
    }
}

function setupData() {
    background(0);
    stroke(0,255,0);
    fill(0,255,0);
    
    curCornerCount = 3;
    multiplier = curCornerCount-2;
    divider = curCornerCount-1;

    newCornerCount = 5;
    minCornerCount = 3;
    maxCornerCount = 8;

    cornerPositions = createNgon(300,300,85,curCornerCount);

    diceCount = new Array(curCornerCount);
    for(let i=0; i<diceCount.length; i++) {
        diceCount[i] = 0;
    }

    pointSize = 0.1;
    cornerSize = 5;

    iterations = 0;
    maxIterations = 1000000;

    curX = (cornerPositions[0].x + cornerPositions[1].x * multiplier)/divider;
    curY = (cornerPositions[0].y + cornerPositions[1].y * multiplier)/divider;
}

function createNgon(x, y, radius, nPoints) {

    let ngonPoints = new Array(nPoints);

    let angle = TWO_PI / curCornerCount;
    let index = 0;
    for(let a=0; a<TWO_PI; a += angle) {
        if(index >= curCornerCount) {
            break;
        }
    
        let rotationOffset = PI/(curCornerCount * 2);
        let pointX = (x + cos(a+rotationOffset) * radius * nPoints);
        let pointY = (y + sin(a+rotationOffset) * radius * nPoints);

        ngonPoints[index] = createVector(pointX, pointY);

        circle(pointX, pointY, cornerSize);

        index++;
    }

    return ngonPoints;
}

function drawNewPoint() {
    let rand = Math.floor(random(curCornerCount));
    diceCount[rand] += 1;

    prevX = curX;
    prevY = curY;
    circle(prevX, prevY, pointSize);

    fill(255,0,0);
    stroke(255,0,0);

    curX = (curX + cornerPositions[rand].x * multiplier)/divider;
    curY = (curY + cornerPositions[rand].y * multiplier)/divider;

    circle(curX, curY, pointSize);

    iterations++;
}

function updateDisplayData() {
    document.getElementById("iterations").innerHTML = "Iterations: "+iterations;
}

