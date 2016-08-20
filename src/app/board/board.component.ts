import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core'
import { TileComponent } from "./tile/tile.component";
import {State} from "../state/state.model";
import {StateService} from "../state/state.service";

@Component({
    selector: 'board',
    encapsulation: ViewEncapsulation.None,
    directives: [TileComponent],
    template: `
        <div class="ui grid">
            <div class="four column row" *ngFor="let row of state.grid.rows()">
                <div class="grey column" *ngFor="let tile of row">
                    <tile [tile]="tile"></tile>
                </div>
            </div>
        </div>
    `,
    styles: [require('./board.component.css')]
})
export class BoardComponent {

    @Input()
    state: State;

    constructor(
        private stateService: StateService
    ){}

    @HostListener('document:keydown', ['$event.keyCode'])
    private slideTiles(keyCode) {
        switch (keyCode) {
            case 37:
                this.slideLeft();
                break;
            case 38:
                this.slideUp();
                break;
            case 39:
                this.slideRight();
                break;
            case 40:
                this.slideDown();
                break;
        }
    }

    @HostListener('swipeleft')
    private slideLeft() {
        this.state = this.stateService.slideLeft(this.state);
    }

    @HostListener('swiperight')
    private slideRight() {
        this.state = this.stateService.slideRight(this.state);
    }

    @HostListener('swipeup')
    private slideUp() {
        this.state = this.stateService.slideUp(this.state);
    }

    @HostListener('swipedown')
    private slideDown() {
        this.state = this.stateService.slideDown(this.state);
    }
}