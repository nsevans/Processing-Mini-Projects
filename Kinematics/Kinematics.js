var arms;
var armAmount = 0;
var segmentAmount = 0;
var isIK = 0;
var startLength = 0;
var lengthGrowRate = 0;
var startThickness = 0;
var thicknessGrowRate = 0;

function setup()
{
    var canvas = createCanvas(1200,600);
    canvas.parent("canvasDiv");
    background(0);

    getInputs();
    buildArray();
}

function draw()
{
    getInputs();
    background(0);
    for(let i=0; i<arms.length; i++)
    {
        arms[i].drawAndUpdate();
    }
}

function buildArray()
{
    let xOffset = width/(armAmount+1);
    let yOffset = 10;

    arms = new Array(armAmount);
    for(let i=0; i<armAmount; i++)
    {
        let x = xOffset*(i+1);
        let y = height + yOffset;
        if(isIK)
        {
            arms[i] = new InverseKinematicArm(x, y, startLength, lengthGrowRate, 
                      startThickness, thicknessGrowRate, segmentAmount);
        }
        else
        {
            arms[i] = new ForwardKinematicArm(x, y, startLength, lengthGrowRate, 
                      startThickness, thicknessGrowRate, segmentAmount);
        }
    }
}

function getInputs()
{
    let changed = false;

    let inputIsIK = document.getElementById("isIK").checked;
    if(isIK != inputIsIK)
    {
        isIK = inputIsIK;
        changed = true;
    }
        
    let inputArmAmount = parseInt(document.getElementById("armAmount").value);
    if(armAmount != inputArmAmount)
    {
        armAmount = inputArmAmount;
        changed = true;
    }

    let inputSegmentAmount = parseInt(document.getElementById("segmentAmount").value);
    if(segmentAmount != inputSegmentAmount)
    {
        segmentAmount = inputSegmentAmount;
        changed = true;
    }
    
    let inputStartLength = parseInt(document.getElementById("startLength").value);
    if(startLength != inputStartLength)
    {
        startLength = inputStartLength;
        changed = true;
    }

    let inputLengthGrowRate = parseFloat(document.getElementById("lengthGrowRate").value);
    if(lengthGrowRate != inputLengthGrowRate)
    {
        lengthGrowRate = inputLengthGrowRate;
        changed = true;
    }
    
    let inputStartThickness = parseInt(document.getElementById("startThickness").value);
    if(startThickness != inputStartThickness)
    {
        startThickness = inputStartThickness;
        changed = true;
    }

    let inputThicknessGrowRate = parseFloat(document.getElementById("thicknessGrowRate").value);
    if(thicknessGrowRate != inputThicknessGrowRate)
    {
        thicknessGrowRate = inputThicknessGrowRate;
        changed = true;
    }

    if(changed)
    {
        buildArray();
    }
}