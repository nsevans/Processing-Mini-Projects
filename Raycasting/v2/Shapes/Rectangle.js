class Rectangle
{

    constructor(x, y, width, height, color)
    {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.color = color;

        this.setupEdges(this.x, this.y, this.w, this.h, this.color);
    }

    setupEdges(x, y, w, h, color)
    {
        this.edges = [];
        this.edges.push(new Edge(x,   y  , x+w, y  , color)); // Top
        this.edges.push(new Edge(x,   y+h, x+w, y+h, color)); // Bottom
        this.edges.push(new Edge(x,   y,   x  , y+h, color)); // Left
        this.edges.push(new Edge(x+w, y,   x+w, y+h, color)); // Right
    }

    draw()
    {
        //fill(this.color);
        //rect(this.x, this.y, this.w, this.h);

        fill(color(222,22,0))
        for(let edge of this.edges)
            edge.draw();
    }
}