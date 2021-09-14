class Cells {

    constructor(width, height, createEmpty=true, liveChance=2) {
        this.width = width;
        this.height = height;
        this.liveChance = liveChance;

        this.LIVESTATE = 1;
        this.DEADSTATE = 0;
        
        if(createEmpty == true){
            this.grid = this.createEmptyGrid();
        }else{
            this.grid = this.createPopulatedGrid();
        }

        
    }

    createEmptyGrid() {
        let newGrid = new Array(width);

        for(let i=0; i<this.width; i++) {
            newGrid[i] = new Array(this.height);

            for(let j=0; j<this.height; j++) {

                newGrid[i][j] = new Cell(i, j, this.DEADSTATE);
            }
        }
        return newGrid;
    }

    createPopulatedGrid() {
        let newGrid = this.createEmptyGrid();
        for(let i=0; i<this.width; i++) {
            for(let j=0; j<this.height; j++) {
                
                var chance = floor(random(this.liveChance));
                if(chance == 1) {
                    newGrid[i][j] = new Cell(i, j, this.LIVESTATE);
                }else {
                    newGrid[i][j] = new Cell(i, j, this.DEADSTATE);
                }
                
            }
        }
        return newGrid;
    }

    getCellState(x,y) {
        return this.grid[x][y].state; 
    }

    getCellColor(x,y) {
        return this.grid[x][y].color;
    }

    updateAllCellStates() {
        let newGrid = this.createEmptyGrid();
        
        for(let i=0; i<this.width; i++) {
            for(let j=0; j<this.height; j++) {

                let neightbourCount = this.countNeighbouringCells(i,j);
                let currentState = this.getCellState(i,j);

                if(currentState == this.DEADSTATE && neightbourCount == 3) {
                    newGrid[i][j].updateState(this.LIVESTATE);
                    
                }else if(currentState == this.LIVESTATE && (neightbourCount == 2 || neightbourCount == 3)) {
                    newGrid[i][j].updateState(this.LIVESTATE);
                    
                }else if(currentState == this.LIVESTATE){
                    newGrid[i][j].updateState(this.DEADSTATE);
                }
            }
        }
        this.grid = newGrid;
    }

    countNeighbouringCells(x, y) {
        let sum = 0;
        for(let i = -1; i < 2; i++) {
            for(let j = -1; j < 2; j++) {
                // Wrap around when out of bounds
                let col = (x + i + this.width) % this.width;
                let row = (y + j + this.height) % this.height;
                if(this.grid[col][row].state == this.LIVESTATE){
                    if(col != x || row != y) {
                        sum += 1;
                    }
                }
            }
        }
        return sum;
    }
}