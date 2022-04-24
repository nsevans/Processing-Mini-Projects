
let rockets;
let rocketCount;

let gravity;

let backgroundColorBottom, backgroundColorTop;

let rate;

function setup() {
    var canvas = createCanvas(innerWidth-10,800);
    canvas.parent("canvasDiv");
    colorMode(HSB);

    background(0);
    strokeWeight(4);

    rocketCount = 100;
    rockets = [];
    gravity = createVector(0, 0.22);

    rate = 0.07
}

function draw() {
    colorMode(RGB);
    background(0,0,0,70);

    if(random(1) < rate) {
        rockets.push(new Rocket(random(1) < 0.05));
    }

    fill(0,60);
    noStroke();
    rect(0,0,width,height);

    for(let i = rockets.length-1; i >= 0; i--) {
        let rocket = rockets[i];
        rocket.run(gravity);
        if(rocket.hasExploded()) {
            rockets.splice(i,1);
        }
    }
}

function setBackgroundGradient() {

}