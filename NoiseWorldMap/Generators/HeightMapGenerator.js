class HeightMapGenerator extends BaseGenerator
{

    constructor(seed, mapWidth, mapHeight)
    {
        super(seed, mapWidth, mapHeight);
    }
    
    setup(zoom, sharpness)
    {
        if(this.doSetup)
        {
            this.zoom = zoom;
            this.sharpness = sharpness;
            
            this.linesPerLoop = 5;
            this.currentLine = 0;
        
            this.EMPTYPOINT = -1;
            this.map = this.initializeMap(this.EMPTYPOINT);
            
            this.doSetup = false;
        }
    }

    run()
    {
        for(let y=this.currentLine; y<this.currentLine+this.linesPerLoop && y<this.mapHeight; y++)
        {
            for(let x=0; x<this.mapWidth; x++)
            {
                let nx = this.zoom * (x / 100);
                let ny = this.zoom * (y / 100);

                // Calculate noise at point
                let e = noise(nx, ny); 
                e += (0.5 * noise(2 * nx + 5.3, 2 * ny + 9.1));
                e += (0.25 * noise(4 * nx + 17.8, 4 * ny + 23.5));
                e /= 1.75;
                e = Math.pow(e * 1.05, 0.8);
                
                // Convert height to color 0-255
                let c = 255 * 0.5 * (Math.tanh((e - 0.5) * this.sharpness) + 1);
                set(x, y, c);
                this.map[x][y] = c;
            }
        }
        updatePixels();

        if(this.currentLine > this.mapHeight)
        {
            this.updateState();
            return;
        }

        this.currentLine += this.linesPerLoop;
    }
}