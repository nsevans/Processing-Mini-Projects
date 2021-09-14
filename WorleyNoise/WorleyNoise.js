
let pointPositions;     // Array of the positions of each randomly generated point

let maxPointsSlider;    // Slider to determine the number of points to be drawn
let maxPoints;          // The number of points to be drawn 

let rgbClose;           // Color of pixels closest to a point
let rgbFar;             // Color of pixels furthest from a point

let strength;           // Color strength of pixels close or far from a point
let curve;              // Color curve for picking how quickly the close color falls off to the far color
let doGradient;         // Flag to determine whether or not to draw a gradient between the two colors or not

function setup() {
    var canvas = createCanvas(800,600);
    canvas.parent("canvasDiv");
    
    maxPointsSlider = document.getElementById("randomPointCount")

    generate();
}

function findDistToClosestPoint(target, pointList) {
    let closestDist = dist(target.x, target.y, pointList[0].x, pointList[0].y);
    
    // Check each point in the canvas
    for(let i=0; i<pointList.length; i++) {
        let curDist = dist(target.x, target.y, pointList[i].x, pointList[i].y);
        // Check if the distance of the current point is less than that of the
        // current closest point
        if(curDist < closestDist) {
            closestDist = curDist;
        }
    }

    return closestDist;
}

function generate() {
    background(0);
    
    maxPoints = parseFloat(maxPointsSlider.value);
    pointPositions = new Array(maxPoints);

    rgbClose = parsePointColor(document.getElementById("closeColor"));
    rgbFar = parsePointColor(document.getElementById("farColor"));

    strength = parseFloat(document.getElementById("strength").value);
    curve = parseFloat(document.getElementById("curve").value);
    //doGradient = document.getElementById("doGradient").checked;

    let maxDistance = findDistToClosestPoint(createVector(0,0), [createVector(width,height)]);//Math.sqrt(Math.pow(width,2)+Math.pow(height,2))/((width+height)/62.5)+1;

    // Place points randomly throughout the canvas
    for(let i=0; i<maxPoints; i++) {
        pointPositions[i] = createVector(random(0,width), random(0,height));
        fill(255,0,0);
        circle(pointPositions[i].x, pointPositions[i].y, 1);
    }

    // Calculate the closest drawn point from each pixel in the canvas
    for(let i=0; i<width; i++) {
        for(let j=0; j<height; j++) {

            // Current pixel
            let pixel = createVector(i,j);

            // Distance to the closest point
            let distToClosestPoint = findDistToClosestPoint(pixel, pointPositions);
            // Color of pixel with a percentage offset for distance from point
            let offset = distToClosestPoint / ((width+height) / 62.5) +1;
            let offsetPercentage = offset / ((maxDistance / (62.5)) +1);

            var rgbNew = [];
            let c = color(0);
            
            // TODO: Work on worley noise without gradient between colors
            //if(doGradient) {
                
            for(let i=0; i<3; i++) {
                rgbNew[i] = Math.floor(((rgbClose[i] * strength) + (rgbFar[i] * (1 - strength))));
            }
            c = color(rgbNew[0]/(1-offsetPercentage), rgbNew[1]/(1-offsetPercentage), rgbNew[2]/(1-offsetPercentage));
            // }
            // else {
            //     //dist to closest point -> 0 - 1000
            //     // max distance -> 1000
            //     // strength -> 0 - 1
            //     for(let i=0; i<3; i++) {
            //         //rgbNew[i] = Math.floor(((rgbClose[i]/(1-curve) * strength)) + (rgbFar[i]/curve * (1 - strength)));
            //         if(offset*offsetPercentage > strength/curve) {
            //             rgbNew[i] = rgbFar[i];
            //         }
            //         else {
            //             rgbNew[i] = rgbClose[i];
            //         }
            //     }
            //     c = color(rgbNew[0], rgbNew[1], rgbNew[2]);
            // }
            
            set(i,j,c);
        }
    }
    updatePixels();
}

function parsePointColor(element) {
    var hexRGB = element.value;
    hexRGB = hexRGB.substring(1, hexRGB.length);
    var rgb = hexRGB.match(/.{1,2}/g);

    rgb[0] = parseInt(rgb[0], 16);
    rgb[1] = parseInt(rgb[1], 16);
    rgb[2] = parseInt(rgb[2], 16);

    return rgb;
}