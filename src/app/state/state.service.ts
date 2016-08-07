import {
    Injectable
} from '@angular/core';

import {State} from "./state.model";
import {Pair} from '../structs/pair';
import {Tile} from "../board/tile/tile.model";

@Injectable()
export class StateService {

    BOARD_WIDTH = 4;
    BOARD_HEIGHT = 4;
    
    public getNewGameState(): State {
        let state = new State();
        state.tiles = Array.from({length: this.BOARD_WIDTH * this.BOARD_HEIGHT}, (v, k) => {
            return new Tile(0, k % this.BOARD_WIDTH, Math.floor(k / this.BOARD_WIDTH));
        });

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
        do {
            tile = state.tiles[this.getRandomInt(0, 16)]
        } while (!tile.isEmpty());

        tile.value = this.getRandomInt(0, 4) > 0 ? 2 : 4;

        return state;
    }

    public slide(state: State): State {
        return this.addRandomTile(this.slideLeft(state));
    }

    private getRandomInt(min, max):number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    private slideLeft(state: State): State {
        let row1 = this.slideTilesLeft(state.tiles.slice(this.BOARD_WIDTH * 0, this.BOARD_WIDTH * 1));
        let row2 = this.slideTilesLeft(state.tiles.slice(this.BOARD_WIDTH * 1, this.BOARD_WIDTH * 2));
        let row3 = this.slideTilesLeft(state.tiles.slice(this.BOARD_WIDTH * 2, this.BOARD_WIDTH * 3));
        let row4 = this.slideTilesLeft(state.tiles.slice(this.BOARD_WIDTH * 3, this.BOARD_WIDTH * 4));

        let update = new State();
        update.tiles = row1.concat(row2, row3, row4);
        return update;
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