class BoundryV1
{
    constructor(x1, y1, x2, y2, boundryColor)
    {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
        this.color = boundryColor
    }

    draw()
    {
        strokeWeight(5);
        stroke(this.color);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}