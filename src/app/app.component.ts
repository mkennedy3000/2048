/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { BoardComponent } from './board/board.component';
import {StateService} from "./state/state.service";
import {State} from "./state/state.model";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  directives: [BoardComponent],
  providers: [StateService],
  template: `
    <div class="ui centered grid container">
        <div class="sixteen wide column">
            <div class="ui padded basic segment">
                <h1 class="ui header">{{name}}</h1>
            </div>
            <div class="ui button" (click)="newGame()">New Game</div>
            <div class="ui hidden divider"></div>
            <board [state]="state"></board>
        </div>
    </div>
  `
})
export class App {

  name = '2048';
  state: State;

  constructor(
    public appState: AppState,
    public stateService: StateService) {

    this.newGame();
  }

  public newGame() {
    this.state = this.stateService.getNewGameState();
  }

}
