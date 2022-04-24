class RayV1
{
    constructor(pos, angle, rayColor)
    {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
        this.color = rayColor;
    }

    lookAt(x, y)
    {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y
        this.dir.normalize();
    }
    
    cast(boundry)
    {
        const x1 = boundry.a.x;
        const y1 = boundry.a.y;
        const x2 = boundry.b.x;
        const y2 = boundry.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if(den == 0)
            return null;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if(t > 0 && t < 1 && u > 0)
        {
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        }
        else
            return null;
    }

    draw()
    {
        stroke(this.color);
        strokeWeight(1)
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x, this.dir.y);
        pop();
    }
}