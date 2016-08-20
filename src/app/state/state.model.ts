import {Tile} from "../board/tile/tile.model";
import {Grid} from '@mkennedy3000/grid';

export class State {
    score: number = 0;

    grid: Grid<Tile>;
}