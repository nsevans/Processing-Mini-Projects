class MapController
{

    constructor(seed, mapWidth, mapHeight, zoom, sharpness, colorLayer)
    {
        
        this.seed = seed;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.zoom = zoom;
        this.sharpness = sharpness;
        this.colorLayer = colorLayer;
        
        this.States = 
        {
            Height: 0,
            Color: 1,
            Done: 2
        };
        this.currentState = 0;

        this.generators = 
        [
            new HeightMapGenerator(seed, mapWidth, mapHeight),
            new ColorMapGenerator(seed, mapWidth, mapHeight)
        ];

        this.currentGenerator = this.generators[this.currentState];
    }

    updateState()
    {
        this.currentState++;
        this.currentGenerator = this.generators[this.currentState];
    }

    run()
    {
        if(this.currentState != this.States.Done)
        {
            switch(this.currentState)
            {
                case this.States.Height: 
                    this.currentGenerator.setup(zoom, sharpness);
                    break;
                case this.States.Color:
                    this.currentGenerator.setup(colorLayers, this.generators[0].map);
                    break;
            }
                    
            this.currentGenerator.run();

            if(this.currentGenerator.generationDone)
            {
                this.updateState();
            }
        }
    }


}