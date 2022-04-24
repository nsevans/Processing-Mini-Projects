
/*
 * TODO:
 *  1. Add shapes that use boundries to outline them
 *      * Circle
 *      * Rectangle
 *  4. Add line gradient so the line fades to nothing by the end of the line length)
 *  6. Add system to add shapes to canvas manually
 */

let walls;
let pointLight;

let rayCount;
let maxBounces;
let lightColor;

let wallCount;
let drawBorders;

function setup()
{
    var canvas = createCanvas(window.innerWidth-10, 600);
    canvas.parent("canvasDiv");

    lightColor = "#ECE3A1"

    walls = new BoundriesV1(wallCount, drawBorders, 100);
    pointLight = new PointLightV1(width / 2, height / 2, rayCount, maxBounces, lightColor);
    getInputs();
}

function draw()
{
    getInputs();

    background(0);

    pointLight.update(mouseX, mouseY);
    pointLight.cast(walls);
    pointLight.draw();

    walls.draw();
}

function getInputs()
{
    let inputRayCount = parseInt(document.getElementById("rayCount").value);
    let inputMaxBounces = parseInt(document.getElementById("maxBounce").value);
    let inputLightColor = parseColor(document.getElementById("lightColorPicker").value);
    if(inputRayCount != rayCount || inputMaxBounces != maxBounces || inputLightColor.toString() != lightColor.toString())
    {
        rayCount = inputRayCount;
        maxBounces = inputMaxBounces;
        lightColor = inputLightColor;
        pointLight.generateRays(rayCount, maxBounces, lightColor);
    }

    let inputBoundryCount = parseInt(document.getElementById("boundryCountSlider").value);
    let inputDrawBorders = document.getElementById("drawBorderCheckbox").checked;
    if(inputBoundryCount != wallCount || inputDrawBorders != drawBorders)
    {
        wallCount = inputBoundryCount;
        drawBorders = inputDrawBorders;
        walls.generateBoundries(wallCount, drawBorders);
    }
}

function parseColor(element) {
    var hexRGB = element.substring(1, element.length);
    var rgb = hexRGB.match(/.{1,2}/g);

    rgb[0] = parseInt(rgb[0], 16);
    rgb[1] = parseInt(rgb[1], 16);
    rgb[2] = parseInt(rgb[2], 16);
    return color(rgb);
}