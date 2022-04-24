class BoundriesV1
{
    constructor(count, drawBorders, boundryColor)
    {
        this.generateBoundries(count, drawBorders);
        this.color = boundryColor;
        
    }

    generateBoundries(count, drawBorders)
    {
        this.boundries = []
        if(drawBorders)
        {
            this.boundries.push(new BoundryV1(0, 0, width, 0, this.color));           // Top border
            this.boundries.push(new BoundryV1(0, height, width, height, this.color)); // Bottom border
            this.boundries.push(new BoundryV1(0, 0, 0, height, this.color));          // Left border
            this.boundries.push(new BoundryV1(width, 0, width, height, this.color));  // rigth border
        }

        for(let i=0; i<count; i++)
        {
            let x1 = random(width);
            let y1 = random(height);
            let x2 = random(width);
            let y2 = random(height);
            this.boundries.push(new BoundryV1(x1, x2, y1, y2, this.color));
        }
    }

    draw()
    {
        for(let boundry of this.boundries)
        {
            boundry.draw();
        }
    }
}