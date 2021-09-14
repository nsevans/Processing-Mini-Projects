
var rectArray;
var arraySize;
var maxRectHeight;
var rectWidth;

var buffer;

var shuffledIndex;

var sortIndex

var state;
var SHUFFLING = 0;
var SORTING = 1;
var DONE = 2;

function setup() {
    var canvas = createCanvas(800,500);
    canvas.parent("canvasDiv");
    
    background(0);

    rectWidth = 10;
    maxRectHeight = height*0.75;
    buffer = 2.25;

    arraySize = width/rectWidth;
    rectArray = new Array(arraySize);

    shuffledIndex = arraySize;
    
    // Bubble sort
    sortIndex = 1;

    //selection sort
    //sortIndex = 0;

    updateState(SHUFFLING);

    generateArray(rectArray);
}

function draw() {
    // Set the origin to the bottom left of the canvas 
    // and flip y value so y increases up
    translate(0,height);
    scale(1, -1);
    
    background(0);

    if(state == SHUFFLING) {
        shuffleRects();

    }else if(state == SORTING){
        // Redraw rectangles or there will be flashing after every pass
        drawUpdatedRects(rectArray);
            
        doBubbleSort();
        //doSelectionSort();
        //doInsertionSort();

    }else if(state == DONE) {
        drawUpdatedRects(rectArray);
    }
}

function generateArray(array) {

    for(let i=0; i<array.length; i++) {
        let x = (rectWidth*i);
        let y = 1;
        let w = rectWidth-buffer;
        let h = ((maxRectHeight/arraySize)*(i+1));
        array[i] = [x,y,w,h];
    }
}

function updateState(newState) {
    state = newState;
    if(state == SHUFFLING) {
        document.getElementById("state").innerHTML = "State: Shuffling";
    }else if(state == SORTING) {
        document.getElementById("state").innerHTML = "State: Sorting";
    }else if(state == DONE) {
        document.getElementById("state").innerHTML = "State: Done";
    }
}

function drawUpdatedRects(array, exceptions=[]) {
    fill(0,255,0);
    stroke(0,150,0);

    for(let i=0; i<exceptions.length; i++) {
        drawRect(exceptions[i]);
    }

    fill(255);
    stroke(150);
    for(let i=0; i<array.length; i++) {
        let doDraw = true;
        for(let j=0; j < exceptions.length; j++) {
            if(array[i][0] == exceptions[j][0]) {
                doDraw = false;
                break;
            }
        }
        if(doDraw == true){
            drawRect(rectArray[i]);
        }
    }
}

function drawRect(rectData) {
    rect(rectData[0],rectData[1],rectData[2],rectData[3]);
}

function compareRect(rect1, rect2) {
    return rect1[0] == rect2[0]
}

function shuffleRects() {
    var shuffledRects = swapIndeces(rectArray);
    fill(0,255,0);
    stroke(0,150,0);
    drawRect(shuffledRects[0]);
    drawRect(shuffledRects[1]);

    drawUpdatedRects(rectArray, shuffledRects);
}

// Fisher-Yates (Knuth) Shuffle
function swapIndeces(array) {
    var randomIndex = 0;

    if(shuffledIndex != 0) {
        randomIndex = Math.floor(Math.random() * shuffledIndex);
        shuffledIndex--;

        // Swap x positions
        [array[shuffledIndex][0], array[randomIndex][0]] = [array[randomIndex][0], array[shuffledIndex][0]];
        // Swap array positions
        //[array[shuffledIndex], array[randomIndex]] = [array[randomIndex], array[shuffledIndex]];
    }else{
        updateState(SORTING);
    }
    return [array[shuffledIndex], array[randomIndex]];
}

function doBubbleSort() {

    let checked = false;

    for(let i=0; i<rectArray.length-1; i++) {
        if(rectArray[i][0] > rectArray[i+1][0]) {
            [rectArray[i][0], rectArray[i+1][0]] = [rectArray[i+1][0], rectArray[i][0]];
            drawUpdatedRects(rectArray, [rectArray[i], rectArray[i+1]]);
            checked = true;
            
        } 
    }
    if(checked == false) {
        updateState(DONE);
    }
}

function doSelectionSort() {
    let min = sortIndex;
    for(let i=sortIndex+1; i<rectArray.length; i++) {
        if(rectArray[i][0] < rectArray[min][0]) {
            min = i;
            
        }
    }

    if(min != sortIndex) {
        [rectArray[sortIndex][0], rectArray[min][0]] = [rectArray[min][0], rectArray[sortIndex][0]];
        drawUpdatedRects(rectArray, [rectArray[sortIndex], rectArray[min]]);
    }

    if(sortIndex >= rectArray.length) {
        updateState(DONE);
    }else{
        sortIndex++;
    }
}

function doInsertionSort() {
    let current = rectArray[sortIndex];
    let i = sortIndex-1;
    while(i >= 0 && current[0] < rectArray[i][0]) {
        rectArray[i+1][0] = rectArray[i][0];
        i--;
    }
    rectArray[i+1] = current;
    drawUpdatedRects(rectArray, [rectArray[i], rectArray[i+1]]);
    
    if(sortIndex >= rectArray.length-1) {
        updateState(DONE);
    }else{
        sortIndex++;
    }
}