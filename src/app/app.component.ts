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
    {{name}}
    <br><br>
    <button (click)="newGame()">New Game</button>
    <button (click)="slideLeft()">Slide Left</button>
    <br><br>
    <board [state]="state"></board>
  `
})
export class App {

  name = 'Angular 2 2048';
  state: State;

  constructor(
    public appState: AppState,
    public stateService: StateService) {

    this.newGame();
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  public newGame() {
    this.state = this.stateService.getNewGameState();
  }

  public slideLeft() {
    this.state = this.stateService.slide(this.state);
  }

}
