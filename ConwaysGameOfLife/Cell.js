class Cell {

    constructor(x, y, state) {
        this.state = state;
        this.x = x;
        this.y = y;

        this.setColor();

        this.lifespan = 0;
    }

    updateState(newState) {
        this.state = newState;
        this.setColor();

    }

    setColor() {
        if(this.state == 1){
            this.color = 255;
        }else{
            this.color = 0;
        }

    }

    updateColor() {
        if(this.state == 1) {
            this.lifespan++;
        }else{
            this.lifespan--;
        }
    }
}