export class Tile {

    public merged: boolean;

    constructor(
        public value: number,

        public x: number,
        public y: number,

        public merged?: boolean
    ) {
        this.merged = !!merged;
    }

    public isEmpty(): boolean {
        return this.value <= 0;
    }


}