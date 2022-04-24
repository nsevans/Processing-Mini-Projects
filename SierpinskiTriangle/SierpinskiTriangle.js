
let cornerPositions;
let curX, curY;
let prevX, prevY;

let cornerCount;
let newCornerCount;
let minCornerCount;
let maxCornerCount;

let pointSize;
let cornerSize

let iteration
let maxIterations;
let iterationsPerCycle

let multiplier, divider;

function setup() {
    var canvas = createCanvas(600,600);
    canvas.parent("canvasDiv");

    setupData();
}

function draw() {


    if(iteration <= maxIterations)
    {
        for(let _=0; _<iterationsPerCycle; _++)
        {
            if(iteration <= maxIterations)
            {
                drawNewPoint();
                updateDisplayData();
                iteration++;
            }
        }
        
    }
}

function setupData() {
    background(0);
    
    cornerCount = 3;
    multiplier = cornerCount-2;
    divider = cornerCount-1;
    
    newCornerCount = 5;
    minCornerCount = 3;
    maxCornerCount = 8;
    
    pointSize = 0.1;
    cornerSize = 3;
    
    iteration = 1;
    maxIterations = 1000000;
    iterationsPerCycle = 37;
    
    stroke(0,255,0);
    fill(0,255,0);
    
    cornerPositions = createNgon(300,300,85,cornerCount);

    fill(255,0,0);
    stroke(255,0,0);

    curX = (cornerPositions[0].x + cornerPositions[1].x * multiplier)/divider;
    curY = (cornerPositions[0].y + cornerPositions[1].y * multiplier)/divider;
}

function createNgon(x, y, radius, nPoints) {

    let ngonPoints = new Array(nPoints);

    let angle = TWO_PI / cornerCount;
    let index = 0;
    for(let a=0; a<TWO_PI; a += angle) {
        if(index >= cornerCount) {
            break;
        }
    
        let rotationOffset = PI/(cornerCount * 2);
        let pointX = (x + cos(a+rotationOffset) * radius * nPoints);
        let pointY = (y + sin(a+rotationOffset) * radius * nPoints);

        ngonPoints[index] = createVector(pointX, pointY);

        stroke(0,255,0);
        circle(pointX, pointY, cornerSize);

        index++;
    }

    return ngonPoints;
}

function drawNewPoint() {
    let rand = Math.floor(random(cornerCount));

    prevX = curX;
    prevY = curY;
    circle(prevX, prevY, pointSize);

    curX = (curX + cornerPositions[rand].x * multiplier)/divider;
    curY = (curY + cornerPositions[rand].y * multiplier)/divider;

    circle(curX, curY, pointSize);
}

function updateDisplayData() {
    document.getElementById("iterations").innerHTML = "Iterations: "+iteration;
}

