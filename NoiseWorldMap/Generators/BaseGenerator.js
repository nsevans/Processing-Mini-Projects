class BaseGenerator
{

    constructor(seed, mapWidth, mapHeight)
    {
        this.seed = seed;
        noiseSeed(this.seed);

        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;

        this.doSetup = true;
        
        this.generationDone = false;
    }

    setup(){}
    run(){}

    updateState()
    {
        this.generationDone = true;
    }

    initializeMap(emptyPoint)
    {
        let map = [];
        for(let x=0; x<this.mapWidth; x++)
        {
            map.push(new Array());
            for(let y=0; y<this.mapHeight; y++)
            {
                map[x].push(emptyPoint);
            }
        }
        return map;
    }
}