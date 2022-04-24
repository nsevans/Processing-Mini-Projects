class PointLightV1
{
    constructor(x, y, rayCount, maxRayBounce, lightColor)
    {
        this.pos = createVector(x, y);
        this.generateRays(rayCount, maxRayBounce, lightColor);
    }

    generateRays(rayCount, maxRayBounce, lightColor)
    {
        
        this.rays = [];
        this.lightColor = lightColor;

        let step = 360/rayCount;
        for(let i=0; i<360; i+=step)
        {
            this.rays.push(new RayV1(this.pos, radians(i), lightColor, maxRayBounce));
        }
    }

    cast(walls)
    {
        for(let ray of this.rays)
        {
            let closestDistance = Infinity;
            let closestPoint = null;
            for(let wall of walls.boundries)
            {
                const pt = ray.cast(wall);
                if(pt)
                {
                    const dist = p5.Vector.dist(this.pos, pt);
                    if(dist < closestDistance)
                    {
                        closestDistance = dist;
                        closestPoint = pt;
                    }
                }
            }
            if(closestPoint)
            {
                stroke(this.lightColor);
                strokeWeight(1)
                line(this.pos.x, this.pos.y, closestPoint.x, closestPoint.y);
            }
        }
    }

    update(x, y)
    {
        this.pos.x = x;
        this.pos.y = y;
    }

    draw()
    {
        fill(this.lightColor);
        ellipse(this.pos.x, this.pos.y, 8);
        for(let ray of this.rays)
            ray.draw();
    }
}