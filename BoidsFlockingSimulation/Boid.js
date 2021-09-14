class Boid {

    constructor() {
        this.pos = createVector(random(width), random(height));
        this.acc = createVector();
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(2,4));

        this.maxForce = 0.2;
        this.maxSpeed = 4;

        this.separatePerceptionRadius = 75;
        this.alignPerceptionRadius = 50;
        this.coherPerceptionRadius = 50;

        this.color = 255;
    }

    update() {
        //Update the position and velocity and limit the 
        // velocity from going to fast
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        
        // Have the boid wrap around the edges of the
        // canvas if it goes out of bounds
        this.wrapEdges();
    }

    show() {
        let theta = this.vel.heading() + radians(90);

        fill(this.color);
        stroke(this.color);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);
        beginShape();
        vertex(0,-3.0*2);
        vertex(-3, 3.0*2);
        vertex(3.0, 3.0*2);
        endShape(CLOSE);
        pop();
    }

    wrapEdges() {
        if(this.pos.x > width) {
            this.pos.x = 0;
        }else if(this.pos.x < 0) {
            this.pos.x = width;
        }

        if(this.pos.y > height) {
            this.pos.y = 0;
        }else if(this.pos.y < 0) {
            this.pos.y = height
        }
    }

    flock(boids) {
        // Get local flockmates
        // Calculate
        this.acc.set(0,0);
        
        let steeringForces = this.calculateSteeringForces(boids);

        steeringForces[0].mult(parseFloat(separationSlider.value));
        steeringForces[1].mult(parseFloat(alignmentSlider.value));
        steeringForces[2].mult(parseFloat(cohesionSlider.value));

        
        // Separation: Steer to avoid crowding local flockmates
        this.acc.add(steeringForces[0]);

        // Alignment: Steer towards the average heading of local flockmates
        this.acc.add(steeringForces[1]);
        
        // Cohesion: Steer to move toward the average position of local flockmates
        this.acc.add(steeringForces[2]);
        
    }

    calculateSteeringForces(boids) {
        let total = 0;
        let separationSteeringForce = createVector();
        let alignmentSteeringForce = createVector();
        let cohesionSteeringForce = createVector();
        
        for(let other of boids) {
            let d = dist(this.pos.x, this.pos.y, 
                    other.pos.x, other.pos.y);
            if(other != this && d < this.alignPerceptionRadius){
                let difference = p5.Vector.sub(this.pos, other.pos);
                difference.div(d);
                separationSteeringForce.add(difference);

                alignmentSteeringForce.add(other.vel);
                
                cohesionSteeringForce.add(other.pos)

                total++;
            }
        }

        if(total > 0) {
            separationSteeringForce.div(total);
            separationSteeringForce.setMag(this.maxSpeed);
            separationSteeringForce.sub(this.vel);
            separationSteeringForce.limit(this.maxForce);

            alignmentSteeringForce.div(total);
            alignmentSteeringForce.setMag(this.maxSpeed);
            alignmentSteeringForce.sub(this.vel);
            alignmentSteeringForce.limit(this.maxForce);

            cohesionSteeringForce.div(total);
            cohesionSteeringForce.sub(this.pos);
            cohesionSteeringForce.setMag(this.maxSpeed);
            cohesionSteeringForce.sub(this.vel);
            cohesionSteeringForce.limit(this.maxForce);
        }

        this.calculateBoidColor(total, boids.length);
        return [separationSteeringForce, alignmentSteeringForce, cohesionSteeringForce];
    }


    calculateBoidColor(concentration, maxBoids) {
        if(consentrationCheckbox.checked) {
            let closeStrength = parseFloat(closeStrengthSlider.value);
            let farStrength = parseFloat(farStrengthSlider.value);
            
            let gradientRatio = Math.pow(closeStrength*concentration,2) / (Math.pow(maxBoids,2)*farStrength);

            var rgbFar = this.parseBoidColor(farColorPicker);
            var rgbClose = this.parseBoidColor(closeColorPicker);
            
            var rgbNew = [];
            for(let i=0; i<3; i++) {
                rgbNew[i] = Math.floor(((rgbClose[i] * gradientRatio) + (rgbFar[i] * (1 - gradientRatio))));
            }

            this.color = color(rgbNew[0],rgbNew[1],rgbNew[2]);
        }else {
            this.color = color(closeColorPicker.value);
        }
    }

    parseBoidColor(element) {
        var hexRGB = element.value;
        hexRGB = hexRGB.substring(1, hexRGB.length);
        var rgb = hexRGB.match(/.{1,2}/g);

        rgb[0] = parseInt(rgb[0], 16);
        rgb[1] = parseInt(rgb[1], 16);
        rgb[2] = parseInt(rgb[2], 16);

        return rgb;

    }
}