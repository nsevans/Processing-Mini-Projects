class RayEmitter
{
    constructor(x, y, count, maxRange, rayColor=color(255), doDrawBouncePoints=false)
    {
        this.position = createVector(x, y);
        this.color = rayColor;
        this.doDrawBouncePoints = doDrawBouncePoints;
        this.setupEmitter(count, maxRange, this.color, this.doDrawBouncePoints);
    }

    setupEmitter(count, maxRange, rayColor, doDrawBouncePoints)
    {
        this.rays = [];
        let step = 360/(count);
        for(let i=0; i<360; i+=step)
        {
            this.rays.push(new Ray(this.position, this.toRadians(i), maxRange, rayColor, doDrawBouncePoints));
        }
    }

    cast(edges)
    {
        for(let ray of this.rays)
            ray.cast(edges.edges);
    }

    toRadians(degrees)
    {
        let radians = degrees * (Math.PI/180);
        return radians;
    }

    update(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    }

    draw()
    {
        for(let ray of this.rays)
            ray.draw();
        
        fill(this.color);
        stroke(this.color);
        ellipse(this.position.x, this.position.y, 8);
    }
}