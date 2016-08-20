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

    @Input()
    tile: Tile;

    @HostBinding('class')
    class: string;

    ngOnChanges() {
        this.updateColor();
    }

    private updateColor() {
        let color;
        switch (this.tile.value) {
            case 0:
                color = 'brown';
                break;
            case 2:
                color = 'blue';
                break;
            case 4:
                color = 'teal';
                break;
            case 8:
                color = 'yellow';
                break;
            case 16:
                color = 'blue stacked';
                break;
            case 32:
                color = 'teal stacked';
                break;
            case 64:
                color = 'yellow stacked';
                break;
            case 128:
                color = 'blue tall stacked';
                break;
            case 256:
                color = 'teal tall stacked';
                break;
            case 512:
                color = 'yellow tall stacked';
                break;
            case 1024:
                color = 'orange tall stacked';
                break;
            default:
                color = 'red tall stacked';
        }

        this.class = `ui ${color} inverted segment`;
    }
}