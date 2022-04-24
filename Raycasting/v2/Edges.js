class Edges
{
    constructor(count, edgeColor, doDrawBorders=true)
    {
        this.color = edgeColor;
        this.setupEdges(count, edgeColor, doDrawBorders);
    }

    setupEdges(count, edgeColor=this.color, doDrawBorders=true)
    {
        this.edges = [];
        for(let i=0; i<count; i++)
        {
            let x1 = random(width);
            let y1 = random(height);
            let x2 = random(width);
            let y2 = random(height);
            this.edges.push(new Edge(x1, x2, y1, y2, edgeColor));
        }

        if(doDrawBorders)
        {
            this.edges.push(new Edge(0, 0, width, 0, edgeColor));           // Top border
            this.edges.push(new Edge(0, height, width, height, edgeColor)); // Bottom border
            this.edges.push(new Edge(0, 0, 0, height, edgeColor));          // Left border
            this.edges.push(new Edge(width, 0, width, height, edgeColor));  // rigth border
        }
    }

    draw()
    {
        fill(this.color);
        for(let edge of this.edges)
            edge.draw();
    }
}