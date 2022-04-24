let curNumber;
let curRow;
let maxNumber;

let pixelSize;
let buffer;

let gridWidth, gridHeight;

let calculationsPerCycle;
let done;

function setup()
{
    var canvas = createCanvas(1555, 7500);
    canvas.parent("canvasDiv");
    background(0);
    
    pixelSize = 1;
    buffer = 1;

    gridWidth = width / (pixelSize+buffer);
    gridHeight = height / (pixelSize+buffer);

    curNumber = 1;
    curRow = 0;
    maxNumber = width * height / ((pixelSize * pixelSize) + buffer);

    calculationsPerCycle = 2333;
    done = false;
    
    stroke(0, 155, 0);
    fill(0, 255, 0);
}

function draw()
{
    for(let i=0; i<calculationsPerCycle && !done; i++)
    {
        if(curNumber >= maxNumber)
            done = true;
        
        if(!done)
        {
            if(isPrime(curNumber))
            {
                let pos = calculatePosition(curNumber);
                rect(pos.x,pos.y,pixelSize,pixelSize);
            }
            if((curNumber * pixelSize) % width == 0)
            {
                curRow++;
            }
            curNumber++;
        }
    }

    updateDisplayData();
}

function isPrime(num)
{
    if(num % 2 == 0)
        return false;

    for(let i = 2; i <= Math.sqrt(num); i++)
    {
        if(num % i === 0)
            return false;
    }
    return true;
}

function calculatePosition(curNumber)
{
    x = (curNumber * (pixelSize + buffer)) % width;
    y = (pixelSize + buffer) * curRow;
    return createVector(x, y);
}

function updateDisplayData()
{
    document.getElementById("iterations").innerHTML = "Pixel Index: "+curNumber.toLocaleString()+"/"+maxNumber.toLocaleString();
}