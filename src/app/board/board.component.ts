import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core'
import { TileComponent } from "./tile/tile.component";
import {State} from "../state/state.model";

@Component({
    selector: 'board',
    encapsulation: ViewEncapsulation.None,
    directives: [TileComponent],
    template: '<tile *ngFor="let tile of state.tiles" [tile]="tile"></tile>',
    styles: [require('./board.component.css')]
})
export class BoardComponent {

    @HostListener('document:keydown', ['$event.keyCode'])
    public slideTiles(keyCode) {
        console.log(keyCode)
    }

    @Input()
    state: State;
}