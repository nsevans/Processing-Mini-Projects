class Rocket {

    constructor(isColorful) {
        this.hue = random(255);
        this.rocket = new Particle(random(width), height-10, this.hue, true);
        this.particles = [];
        this.particleCount = random(50,200);

        this.isColorful = isColorful;
    }

    hasExploded() {
        if(this.rocket == null && this.particles.length == 0) {
            return true;
        }else {
            return false;
        }
    }

    run(gravity) {
        if(this.rocket != null) {
            fill(this.hue, 255, 255);
            this.rocket.applyForce(gravity);
            this.rocket.update();
            this.rocket.display();

            if(this.rocket.shouldExplode()) {
                for(let i=0; i<this.particleCount; i++) {
                    if(this.isColorful){
                        this.particles.push(new Particle(this.rocket.pos.x, this.rocket.pos.y, random(255), false));
                    }else{
                        this.particles.push(new Particle(this.rocket.pos.x, this.rocket.pos.y, this.hue, false));
                    }
                }
                this.rocket = null;
            }
        }

        for(let i=this.particles.length-1; i >= 0; i--) {
            let p = this.particles[i];
            if(p != null) {
                p.applyForce(gravity);
                p.run();
                if(p.isDead()) {
                    this.particles.splice(i,1);
                }
            }
        }
    }

    isDead() {
        if(this.particles.length == 0) {
            return true;
        }
        return false;
    }
}