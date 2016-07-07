import {
    Component,
    Input,
    ViewEncapsulation,
    HostBinding,
    OnChanges
} from '@angular/core'

import {Tile} from "./tile.model";

@Component({
    selector: 'tile',
    encapsulation: ViewEncapsulation.None,
    template: '<span *ngIf="!tile.isEmpty()">{{tile.value}}</span>',
    styles: [require('./tile.component.css')]
})
export class TileComponent implements OnChanges {

    TILE_SIZE = 100;

    @Input()
    tile: Tile;

    @HostBinding('style.left')
    xPos;
    @HostBinding('style.top')
    yPos;

    @HostBinding('style.background')
    color;

    ngOnChanges() {
        this.updatePosition();
        this.updateColor();
    }

    private updatePosition() {
        this.xPos = `${this.tile.x * this.TILE_SIZE}px`;
        this.yPos = `${this.tile.y * this.TILE_SIZE}px`;
    }

    private updateColor() {
        switch (this.tile.value) {
            case 2:
                this.color = 'lightblue';
            default:
                this.color = 'lightgray';
        }
    }
}