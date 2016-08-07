export class Grid<T> {

    constructor(private array: Array<T>,
                private _width: number,
                private _height: number
    ) {}

    public static withRows<U>(rows: Array<Array<U>>): Grid<U> {
        const w = rows[0].length;
        const h = rows.length;
        return new Grid(rows.reduce((grid, row) => grid.concat(row), []), w, h);
    }

    public static withCols<U>(cols: Array<Array<U>>): Grid<U> {
        return Grid.withRows(cols.reverse()).rotate90();
    }

    public transpose(): Grid<T> {
        let transposed = this.array.map((val, ind) => this.get(this.rowNum(ind), this.colNum(ind)), this)
        return new Grid(transposed, this.width, this.height);
    }

    public flipX(): Grid<T> {
        return Grid.withRows(this.rows().map((row) => row.reverse()));
    }

    public flipY(): Grid<T> {
        return Grid.withCols(this.cols().map((col) => col.reverse()));
    }

    public rotate90(): Grid<T> {
        return this.transpose().flipX();
    }

    public rotate180(): Grid<T> {
        return this.flipY().flipX();
    }

    public rotate270(): Grid<T> {
        return this.transpose().flipY();
    }

    public get(x: number, y: number): T {
        return this.array[this.pos(x,y)];
    }

    get height(): number {
        return this._height;
    }

    get numRows(): number {
        return this.height;
    }

    public rows(): Array<Array<T>> {
        const self = this;
        return this.array.reduce((grid, val, ind) => {
            grid[self.rowNum(ind)].push(val);
            return grid;
        }, Array.from(new Array(this.numRows), ()=>[]));
    }

    get width(): number {
        return this._width;
    }

    get numCols(): number {
        return this.width;
    }

    public cols(): Array<Array<T>> {
        const self = this;
        return this.array.reduce((grid, val, ind) => {
            grid[self.colNum(ind)].push(val);
            return grid;
        }, Array.from(new Array(this.numCols), ()=>[]));
    }

    private pos(x: number, y: number): number {
        return (y * this.width) + x;
    }

    private rowNum(pos: number): number {
        return (pos - this.colNum(pos)) / this.numCols;
    }

    private colNum(pos: number): number {
        return pos % this.numRows;
    }

}