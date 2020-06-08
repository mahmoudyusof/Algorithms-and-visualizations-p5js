class Square{

    constructor(state, x, y){
        this.state = state;
        this.x = x;
        this.y = y;
    }

    countN(grid){
        let count = 0;
        let cols = grid.length;
        let rows = grid[0].length
        let val;
        for(let i=-1; i<2; i++){
            for(let j=-1; j<2; j++){
                let col = (this.x + i + cols) % cols;
                let row = (this.y + j + rows) % rows;
                val = grid[col][row].state ? 1 : 0;
                count += val;
            }
        }
        val = this.state ? 1 : 0;
        count -= val;
        return count;
    }

    flip(){
        this.state = !this.state
    }
}