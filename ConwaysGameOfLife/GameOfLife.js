
let grid;
let gridWidth;
let gridHeight;
let automatonSize = 15;

let count = 0;

function setup() {
    var canvas = createCanvas(1050,750);
    canvas.parent("canvasDiv");
    gridWidth = width / automatonSize;
    gridHeight = height / automatonSize;
    grid = new Cells(gridWidth, gridHeight, false, 5);
    drawGridCells()
}

function draw() {
    background(0);
    grid.updateAllCellStates();
    drawGridCells();
}

function drawGridCells() {
    // Color cells based on thier state
    for (let i=0; i<gridWidth; i++){
        for(let j=0; j<gridHeight; j++) {

            let x = i * automatonSize;
            let y = j * automatonSize;
            drawCell(x, y, grid.getCellColor(i,j));
        }
    }
}

function drawCell(x, y, color) {
    fill(color);
    stroke(0);
    rect(x,y, automatonSize-1, automatonSize-1);
}

function restartSimulation() {
    background(0);
    grid = new Cells(gridWidth, gridHeight, false, 5);
    drawGridCells();
}