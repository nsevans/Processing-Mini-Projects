class Edge
{
    constructor(x1, y1, x2, y2, edgeColor, reflectionCost=0.95)
    {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
        this.color = edgeColor;

        this.reflectionCost = reflectionCost;

    }

    calculateNormal()
    {
        let dx = this.b.x - this.a.x;
        let dy = this.b.y - this.a.y;
        return createVector(dy, -dx);
    }

    equals(other)
    {
        if(other && this.a.equals(other.a) && this.b.equals(other.b))
        // if(other && other.a.x == this.a.x && other.a.y == this.a.y && 
        //     other.b.x == this.b.x && other.b.y == this.b.y)
            return true
        return false;
    }

    draw()
    {
        strokeWeight(2);
        stroke(this.color);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}