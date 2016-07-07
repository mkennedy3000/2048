webpackJsonp([2],{519:function(t,e){e.HmrState=function(){}},494:function(t,e,i){"use strict";var n=i(1),o=i(232),r=i(495),s=i(498),a=function(){function t(t,e){this.appState=t,this.stateService=e,this.name="Angular 2 2048",this.newGame()}return t.prototype.ngOnInit=function(){console.log("Initial App State",this.appState.state)},t.prototype.newGame=function(){this.state=this.stateService.getNewGameState()},t.prototype.slideLeft=function(){this.state=this.stateService.slide(this.state)},t=__decorate([n.Component({selector:"app",encapsulation:n.ViewEncapsulation.None,directives:[r.BoardComponent],providers:[s.StateService],template:'\n    {{name}}\n    <br><br>\n    <button (click)="newGame()">New Game</button>\n    <button (click)="slideLeft()">Slide Left</button>\n    <br><br>\n    <board [state]="state"></board>\n  '}),__metadata("design:paramtypes",["function"==typeof(e="undefined"!=typeof o.AppState&&o.AppState)&&e||Object,"function"==typeof(i="undefined"!=typeof s.StateService&&s.StateService)&&i||Object])],t);var e,i}();e.App=a},232:function(t,e,i){"use strict";var n=i(1),o=i(519),r=function(){function t(){this._state={}}return Object.defineProperty(t.prototype,"state",{get:function(){return this._state=this._clone(this._state)},set:function(t){throw new Error("do not mutate the `.state` directly")},enumerable:!0,configurable:!0}),t.prototype.get=function(t){var e=this.state;return e.hasOwnProperty(t)?e[t]:e},t.prototype.set=function(t,e){return this._state[t]=e},t.prototype._clone=function(t){return JSON.parse(JSON.stringify(t))},__decorate([o.HmrState(),__metadata("design:type",Object)],t.prototype,"_state",void 0),t=__decorate([n.Injectable(),__metadata("design:paramtypes",[])],t)}();e.AppState=r},684:function(t,e){t.exports="board{display:flex;position:relative;width:400px;height:400px;background:green}"},495:function(t,e,i){"use strict";var n=i(1),o=i(496),r=i(351),s=function(){function t(){}return t.prototype.slideTiles=function(t){console.log(t)},__decorate([n.HostListener("document:keydown",["$event.keyCode"]),__metadata("design:type",Function),__metadata("design:paramtypes",[Object]),__metadata("design:returntype",void 0)],t.prototype,"slideTiles",null),__decorate([n.Input(),__metadata("design:type","function"==typeof(e="undefined"!=typeof r.State&&r.State)&&e||Object)],t.prototype,"state",void 0),t=__decorate([n.Component({selector:"board",encapsulation:n.ViewEncapsulation.None,directives:[o.TileComponent],template:'<tile *ngFor="let tile of state.tiles" [tile]="tile"></tile>',styles:[i(684)]}),__metadata("design:paramtypes",[])],t);var e}();e.BoardComponent=s},685:function(t,e){t.exports="tile{display:block;position:absolute;width:80px;height:80px;margin:10px;color:green;font-weight:700;line-height:80px;text-align:center}"},496:function(t,e,i){"use strict";var n=i(1),o=i(350),r=function(){function t(){this.TILE_SIZE=100}return t.prototype.ngOnChanges=function(){this.updatePosition(),this.updateColor()},t.prototype.updatePosition=function(){this.xPos=this.tile.x*this.TILE_SIZE+"px",this.yPos=this.tile.y*this.TILE_SIZE+"px"},t.prototype.updateColor=function(){switch(this.tile.value){case 2:this.color="lightblue";default:this.color="lightgray"}},__decorate([n.Input(),__metadata("design:type","function"==typeof(e="undefined"!=typeof o.Tile&&o.Tile)&&e||Object)],t.prototype,"tile",void 0),__decorate([n.HostBinding("style.left"),__metadata("design:type",Object)],t.prototype,"xPos",void 0),__decorate([n.HostBinding("style.top"),__metadata("design:type",Object)],t.prototype,"yPos",void 0),__decorate([n.HostBinding("style.background"),__metadata("design:type",Object)],t.prototype,"color",void 0),t=__decorate([n.Component({selector:"tile",encapsulation:n.ViewEncapsulation.None,template:'<span *ngIf="!tile.isEmpty()">{{tile.value}}</span>',styles:[i(685)]}),__metadata("design:paramtypes",[])],t);var e}();e.TileComponent=r},350:function(t,e){"use strict";var i=function(){function t(t,e,i,n){this.value=t,this.x=e,this.y=i,this.merged=n,this.merged=!!n}return t.prototype.isEmpty=function(){return this.value<=0},t}();e.Tile=i},497:function(t,e,i){"use strict";function n(t){for(var i in t)e.hasOwnProperty(i)||(e[i]=t[i])}n(i(494)),n(i(232));var o=i(232);e.APP_PROVIDERS=[o.AppState]},351:function(t,e){"use strict";var i=function(){function t(){this.score=0,this.tiles=[]}return t}();e.State=i},498:function(t,e,i){"use strict";var n=i(1),o=i(351),r=i(499),s=i(350),a=function(){function t(){this.BOARD_WIDTH=4,this.BOARD_HEIGHT=4}return t.prototype.getNewGameState=function(){var t=this,e=new o.State;return e.tiles=Array.from({length:this.BOARD_WIDTH*this.BOARD_HEIGHT},function(e,i){return new s.Tile(0,i%t.BOARD_WIDTH,Math.floor(i/t.BOARD_WIDTH))}),this.addRandomTiles(e,2)},t.prototype.addRandomTiles=function(t,e){return 0===e?t:this.addRandomTiles(this.addRandomTile(t),e-1)},t.prototype.addRandomTile=function(t){var e;do e=t.tiles[this.getRandomInt(0,16)];while(!e.isEmpty());return e.value=this.getRandomInt(0,4)>0?2:4,t},t.prototype.slide=function(t){return this.addRandomTile(this.slideLeft(t))},t.prototype.getRandomInt=function(t,e){return Math.floor(Math.random()*(e-t))+t},t.prototype.slideLeft=function(t){var e=this.slideTilesLeft(t.tiles.slice(0*this.BOARD_WIDTH,1*this.BOARD_WIDTH)),i=this.slideTilesLeft(t.tiles.slice(1*this.BOARD_WIDTH,2*this.BOARD_WIDTH)),n=this.slideTilesLeft(t.tiles.slice(2*this.BOARD_WIDTH,3*this.BOARD_WIDTH)),r=this.slideTilesLeft(t.tiles.slice(3*this.BOARD_WIDTH,4*this.BOARD_WIDTH)),s=new o.State;return s.tiles=e.concat(i,n,r),s},t.prototype.slideTilesLeft=function(t){for(var e=t,i=1;i<=t.length;i++)e=this.slideTileLeft(e.slice(0,i)).concat(e.slice(i));return e.map(function(t){return t.merged=!1,t})},t.prototype.slideTileLeft=function(t){return this.slideTileRight(t.reverse()).reverse()},t.prototype.slideTileRight=function(t){if(t.length<=1)return t;var e=this.mergeTiles(new r.Pair(t[0],t[1])),i=t.slice(1);i[0]=e.right;var n=this.slideTileRight(i);return n.unshift(e.left),n},t.prototype.mergeTiles=function(t){var e=t.left,i=t.right;return i.isEmpty()?new r.Pair(new s.Tile(0,e.x,e.y),new s.Tile(e.value,i.x,i.y)):e.value!=i.value||i.isEmpty()||e.merged||i.merged?t:new r.Pair(new s.Tile(0,e.x,e.y),new s.Tile(2*i.value,i.x,i.y,(!0)))},t=__decorate([n.Injectable(),__metadata("design:paramtypes",[])],t)}();e.StateService=a},499:function(t,e){"use strict";var i=function(){function t(t,e){this.left=t,this.right=e}return t}();e.Pair=i},0:function(t,e,i){"use strict";function n(t){return o.bootstrap(a.App,r.PLATFORM_PROVIDERS.concat(s.ENV_PROVIDERS,a.APP_PROVIDERS)).then(s.decorateComponentRef).catch(function(t){return console.error(t)})}var o=i(336),r=i(500),s=i(501),a=i(497);e.main=n;document.addEventListener("DOMContentLoaded",function(){return n()})},352:function(t,e,i){"use strict";var n=i(1),o=i(207);e.APPLICATION_DIRECTIVES=o.REACTIVE_FORM_DIRECTIVES.slice(),e.DIRECTIVES=[{provide:n.PLATFORM_DIRECTIVES,multi:!0,useValue:e.APPLICATION_DIRECTIVES}]},353:function(t,e,i){"use strict";var n=i(1);e.APPLICATION_PIPES=[],e.PIPES=[{provide:n.PLATFORM_PIPES,multi:!0,useValue:e.APPLICATION_PIPES}]},354:function(t,e,i){"use strict";var n=i(328),o=i(207);e.APPLICATION_PROVIDERS=[o.disableDeprecatedForms(),o.provideForms()].concat(n.HTTP_PROVIDERS),e.PROVIDERS=e.APPLICATION_PROVIDERS.slice()},500:function(t,e,i){"use strict";function n(t){for(var i in t)e.hasOwnProperty(i)||(e[i]=t[i])}n(i(352)),n(i(353)),n(i(354));var o=i(352),r=i(353),s=i(354);e.PLATFORM_PROVIDERS=s.PROVIDERS.concat(o.DIRECTIVES,r.PIPES)},501:function(t,e,i){"use strict";var n=i(147),o=i(1),r=[],s=function(t){return t};n.disableDebugTools(),o.enableProdMode(),r=r.slice(),e.decorateComponentRef=s,e.ENV_PROVIDERS=r.slice()}});
//# sourceMappingURL=main.3ecc74bb36db0d697246.bundle.map