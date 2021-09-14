let flock = [];
let flockSize;

let separationSlider, alignmentSlider, cohesionSlider;
let strengthSlider, weaknessSlider;
let consentrationCheckbox;
let farColorPicker, closeColorPicker;

function setup() {
    var canvas = createCanvas(1200, 600);
    canvas.parent("canvasDiv");
    flockSize = 400;

    setupInteractables();

    for(let i=0; i<flockSize; i++) {
        flock.push(new Boid());    
    }
}

function draw() {
    background(25);

    for(let boid of flock) {
        boid.show();
    }

    for(let boid of flock) {
        boid.flock(flock);
    }

    for(let boid of flock) {
        boid.update();
    }

    //console.log(consentrationCheckbox.value);
}

function setupInteractables() {
    separationSlider = document.getElementById("separationSlider");
    alignmentSlider = document.getElementById("alignmentSlider");
    cohesionSlider = document.getElementById("cohesionSlider");

    closeStrengthSlider = document.getElementById("closeStrength");
    farStrengthSlider = document.getElementById("farStrength");

    consentrationCheckbox = document.getElementById("consentrationCheckbox");
    
    farColorPicker = document.getElementById("farColor");
    closeColorPicker = document.getElementById("closeColor");
}