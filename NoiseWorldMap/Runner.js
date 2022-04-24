
let mapController;
let seed;
let zoom;
let sharpness;
let colorLayers;

function setup()
{
    var canvas = createCanvas(1200,700);
    canvas.parent("canvasDiv");
    
    randomSeed(random(1,1000));
    seed = random(0,255);
    zoom = 1;
    sharpness = 5;

    colorLayers = [
        new ColorLayer(0, 0.15, color("#141266")), new ColorLayer(0.15, 0.25, color("#193b8a")), 
        new ColorLayer(0.25, 0.45,color("#2a52b0")), new ColorLayer(0.45, 0.5, color("#5790e6")),
        new ColorLayer(0.5, 0.55, color("#cbd49f")), new ColorLayer(0.55, 0.75, color("#318f3a")),
        new ColorLayer(0.75, 0.92, color("#17732b")), new ColorLayer(0.92, 0.95, color("#727873")),
        new ColorLayer(0.95, 1, color("#e0e0e0"))
    ];
    
    mapController = new MapController(seed, width, height, zoom, sharpness, colorLayers);

    background(0);
}

function draw()
{
    mapController.run();
}