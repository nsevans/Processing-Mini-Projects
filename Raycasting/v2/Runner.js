let rayEmitter;
let ray;
let edges;

let rayCount;
let maxRange;
let rayColor;
let doDrawBouncePoints;

let edgeCount;
let doDrawBorders;

let doDrawSingleRay;

let shape;

function setup()
{
    var canvas = createCanvas(window.innerWidth-15, 600);
    canvas.style('display', 'block');
    canvas.parent("canvasDiv");
    
    rayColor = "#FFFFFF"

    let edgeColor = color(222,22,0);
    edges = new Edges(edgeCount, edgeColor, doDrawBorders);

    //shape = new Rectangle(400, 200, 150, 150, color(0));

    rayEmitter = new RayEmitter(width/2, height/2, rayCount, maxRange, rayColor, doDrawBouncePoints);
    ray = new Ray(createVector(width/2, height/2), 90, maxRange, rayColor, doDrawBouncePoints);

    getControlInputs();

    //edges.edges = edges.edges.concat(shape.edges);
}

function draw()
{
    getControlInputs();

    background(0);
    
    
    if(doDrawSingleRay)
    {
        // Update ray to look towards the mouse
        ray.lookAt(mouseX, mouseY);
        // Cast ray given all edges
        ray.cast(edges.edges);
        //Draw ray
        ray.draw();
    }
    else
    {
        // Update emitters position
        rayEmitter.update(mouseX, mouseY);
        // Cast rays given all edges
        rayEmitter.cast(edges);
        // Draw emitter and rays
        rayEmitter.draw();
    }

    // Draw all edges
    edges.draw();
}

function getControlInputs()
{
    let inputRayCount = parseInt(document.getElementById("rayCount").value);
    let inputMaxRange = parseFloat(document.getElementById("maxRange").value);
    let inputRayColor = parseColor(document.getElementById("rayColorPicker").value);
    let inputDoDrawBouncePoints = document.getElementById("doDrawBouncePointsCheckbox").checked;
    if(inputRayCount != rayCount || inputMaxRange != maxRange || inputRayColor.toString() != rayColor.toString() || inputDoDrawBouncePoints != doDrawBouncePoints)
    {
        rayCount = inputRayCount;
        maxRange = inputMaxRange;
        rayColor = inputRayColor;
        doDrawBouncePoints = inputDoDrawBouncePoints;
        rayEmitter.setupEmitter(rayCount, maxRange, rayColor, doDrawBouncePoints);
        ray = new Ray(createVector(width/2, height/2), 90, maxRange, rayColor, doDrawBouncePoints);
    }

    let inputEdgeCount = parseInt(document.getElementById("edgeCountSlider").value);
    let inputDrawBorders = document.getElementById("doDrawBorderCheckbox").checked;
    if(inputEdgeCount != edgeCount || inputDrawBorders != doDrawBorders)
    {
        edgeCount = inputEdgeCount;
        doDrawBorders = inputDrawBorders;
        edges.setupEdges(edgeCount, edges.color, doDrawBorders);
    }

    doDrawSingleRay = document.getElementById("doDrawSingleRayCheckbox").checked;
}

function parseColor(element) {
    var hexRGB = element.substring(1, element.length);
    var rgb = hexRGB.match(/.{1,2}/g);

    rgb[0] = parseInt(rgb[0], 16);  // Red
    rgb[1] = parseInt(rgb[1], 16);  // Green
    rgb[2] = parseInt(rgb[2], 16);  // Blue
    //rgb[3] = 200;                 // Alpha
    return color(rgb);
}