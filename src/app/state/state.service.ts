import {
    Injectable
} from '@angular/core';

import {State} from "./state.model";
import {Pair} from '../structs/pair';
import {Tile} from "../board/tile/tile.model";
import {Grid} from "@mkennedy3000/grid";

@Injectable()
export class StateService {

    BOARD_WIDTH = 4;
    BOARD_HEIGHT = 4;
    
    public getNewGameState(): State {
        let state = new State();
        let tiles = Array.from({length: this.BOARD_WIDTH * this.BOARD_HEIGHT}, (v, k) => {
            return new Tile(0, k % this.BOARD_WIDTH, Math.floor(k / this.BOARD_WIDTH));
        });
        state.grid = new Grid(tiles, this.BOARD_WIDTH, this.BOARD_HEIGHT);

        return this.addRandomTiles(state, 2);
    }

    private addRandomTiles(state: State, num: number): State {
        if (num === 0) {
            return state;
        } else {
            return this.addRandomTiles(this.addRandomTile(state), num - 1);
        }
    }

    private addRandomTile(state: State): State {
        let tile;
        if (!state.grid.rows().some(row => row.some(tile => tile.isEmpty()))) return state;
        do {
            tile = state.grid.get(this.getRandomInt(0, state.grid.width), this.getRandomInt(0, state.grid.height));
        } while (!tile.isEmpty());

        tile.value = this.getRandomInt(0, 4) > 0 ? 2 : 4;

        return state;
    }

    private getRandomInt(min, max):number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public slideLeft(state: State): State {
        let update = new State();
        update.grid = Grid.withRows(state.grid.rows().map(row => this.slideTilesLeft(row)));
        return this.addRandomTile(update);
    }

    public slideRight(state: State): State {
        let update = new State();
        update.grid = Grid.withRows(state.grid.rows().map(row => this.slideTilesLeft(row.reverse()).reverse()));
        return this.addRandomTile(update);
    }

    public slideUp(state: State): State {
        let update = new State();
        update.grid = Grid.withCols(state.grid.cols().map(col => this.slideTilesLeft(col)));
        return this.addRandomTile(update);
    }

    public slideDown(state: State): State {
        let update = new State();
        update.grid = Grid.withCols(state.grid.cols().map(col => this.slideTilesLeft(col.reverse()).reverse()));
        return this.addRandomTile(update);
    }

    private slideTilesLeft(tiles: Tile[]): Tile[] {
        let updates = tiles;
        for (let i = 1; i <= tiles.length; i++) {
            updates = this.slideTileLeft(updates.slice(0, i)).concat(updates.slice(i));
        }

        return updates.map((tile) => {
            tile.merged = false;
            return tile;
        });
    }

    private slideTileLeft(tiles: Tile[]): Tile[] {
        return this.slideTileRight(tiles.reverse()).reverse();
    }

    private slideTileRight(tiles: Tile[]): Tile[] {
        if (tiles.length <= 1) {
            return tiles;
        }
        
        let merged = this.mergeTiles(new Pair(tiles[0], tiles[1]));
        let remaining = tiles.slice(1);
        remaining[0] = merged.right;

        let res = this.slideTileRight(remaining);
        res.unshift(merged.left);
        return res;
    }

    private mergeTiles(tiles:Pair<Tile>): Pair<Tile> {
        let left = tiles.left;
        let right = tiles.right;

        if (right.isEmpty()) {
            // Move
            return new Pair(new Tile(0, left.x, left.y), new Tile(left.value, right.x, right.y));
        } else if (left.value == right.value && !right.isEmpty() && !left.merged && !right.merged) {
            // Merge
            return new Pair(new Tile(0, left.x, left.y), new Tile(right.value * 2, right.x, right.y, true));
        } else {
            // No Change
            return tiles;
        }
    }
}