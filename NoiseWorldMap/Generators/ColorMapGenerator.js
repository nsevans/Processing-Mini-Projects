class ColorMapGenerator extends BaseGenerator
{
    constructor(seed, mapWidth, mapHeight, )
    {
        super(seed, mapWidth, mapHeight);
    }

    setup(colorLayers, heightMap)
    {
        if(this.doSetup)
        {
            this.colorLayers = colorLayers;
            this.heightMap = heightMap;

            this.currentLayer = 0;
            this.linesPerLoop = 10;
            this.currentLine = 0;

            this.EMPTYPOINT = new ColorLayer(-1, -1, null);
            this.map = this.initializeMap(this.EMPTYPOINT);
            
            this.doSetup = false;
        }
    }

    run()
    {
        let layer = this.colorLayers[this.currentLayer];

        for(let x=this.currentLine; x<this.currentLine+this.linesPerLoop && x<this.mapWidth; x++)
        {
            for(let y=0; y<this.mapHeight; y++)
            {
                this.setPoint(x, y, layer);
            }
        }
        updatePixels();

        if(this.currentLine > this.mapWidth)
        {
            this.currentLayer++;
            this.currentLine = 0;
        }
        else
        {
            this.currentLine += this.linesPerLoop;
        }

        if(this.currentLayer >= this.colorLayers.length)
        {
            this.updateState();
            return;
        }
    }

    setPoint(x, y, layer)
    {
        if(this.map[x][y].equals(this.EMPTYPOINT))
        {
            let pixel = this.heightMap[x][y] / 255;
            if(layer.lowerBound <= pixel && pixel <= layer.upperBound)
            {
                set(x, y, layer.color);
                this.map[x][y] = layer
            }
        }
    }
}