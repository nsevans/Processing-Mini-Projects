class Particle {

    constructor(x, y, hue, isRocket) {

        this.pos = createVector(x, y);
        this.acc = createVector(0,0);
        
        this.hue = hue;
        this.lifespan = random(240,280);
        
        this.isRocket = isRocket;
        if(this.isRocket){
            this.vel = createVector(random(-1,1), random(-18, -13));
        
        }else{
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(4,8));
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    run() {
        this.update();
        this.display();
    }

    shouldExplode() {
        if(this.isRocket && this.vel.y > 0) {
            this.lifespan = 0;
            return true;
        }
        return false;
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if(!this.isRocket) {
            this.lifespan -= 5;
            this.vel.mult(0.95);
        }
        this.acc.mult(0);
    }

    display() {
        colorMode(HSB);
        if(this.isRocket) {
            strokeWeight(4);
            stroke(this.hue, 255, 255, this.lifespan);
        }else {
            strokeWeight(2);
            stroke(this.hue, 255, 255 * Math.abs(cos(this.lifespan/3)));
        }
        point(this.pos.x, this.pos.y);
    }

    isDead() {
        if(this.lifespan < 0) {
            return true;
        }
        return false;
    }
}