webpackJsonp([2],{519:function(t,e){e.HmrState=function(){}},520:function(t,e){"use strict";var n=function(){function t(t,e,n){this.array=t,this._width=e,this._height=n}return t.withRows=function(e){var n=e[0].length,i=e.length;return new t(e.reduce(function(t,e){return t.concat(e)},[]),n,i)},t.withCols=function(e){return t.withRows(e.reverse()).rotate90()},t.prototype.transpose=function(){var e=this,n=this.array.map(function(t,n){return e.get(e.rowNum(n),e.colNum(n))},this);return new t(n,this.width,this.height)},t.prototype.flipX=function(){return t.withRows(this.rows().map(function(t){return t.reverse()}))},t.prototype.flipY=function(){return t.withCols(this.cols().map(function(t){return t.reverse()}))},t.prototype.rotate90=function(){return this.transpose().flipX()},t.prototype.rotate180=function(){return this.flipY().flipX()},t.prototype.rotate270=function(){return this.transpose().flipY()},t.prototype.get=function(t,e){return this.array[this.pos(t,e)]},Object.defineProperty(t.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"numRows",{get:function(){return this.height},enumerable:!0,configurable:!0}),t.prototype.rows=function(){var t=this;return this.array.reduce(function(e,n,i){return e[t.rowNum(i)].push(n),e},Array.from(new Array(this.numRows),function(){return[]}))},Object.defineProperty(t.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"numCols",{get:function(){return this.width},enumerable:!0,configurable:!0}),t.prototype.cols=function(){var t=this;return this.array.reduce(function(e,n,i){return e[t.colNum(i)].push(n),e},Array.from(new Array(this.numCols),function(){return[]}))},t.prototype.pos=function(t,e){return e*this.width+t},t.prototype.rowNum=function(t){return(t-this.colNum(t))/this.numCols},t.prototype.colNum=function(t){return t%this.numRows},t}();e.Grid=n},495:function(t,e,n){"use strict";var i=n(1),r=n(232),o=n(496),s=n(352),a=function(){function t(t,e){this.appState=t,this.stateService=e,this.name="2048",this.newGame()}return t.prototype.newGame=function(){this.state=this.stateService.getNewGameState()},t=__decorate([i.Component({selector:"app",encapsulation:i.ViewEncapsulation.None,directives:[o.BoardComponent],providers:[s.StateService],template:'\n    <div class="ui centered grid container">\n        <div class="sixteen wide column">\n            <div class="ui padded basic segment">\n                <h1 class="ui header">{{name}}</h1>\n            </div>\n            <div class="ui button" (click)="newGame()">New Game</div>\n            <div class="ui hidden divider"></div>\n            <board [state]="state"></board>\n        </div>\n    </div>\n  '}),__metadata("design:paramtypes",["function"==typeof(e="undefined"!=typeof r.AppState&&r.AppState)&&e||Object,"function"==typeof(n="undefined"!=typeof s.StateService&&s.StateService)&&n||Object])],t);var e,n}();e.App=a},232:function(t,e,n){"use strict";var i=n(1),r=n(519),o=function(){function t(){this._state={}}return Object.defineProperty(t.prototype,"state",{get:function(){return this._state=this._clone(this._state)},set:function(t){throw new Error("do not mutate the `.state` directly")},enumerable:!0,configurable:!0}),t.prototype.get=function(t){var e=this.state;return e.hasOwnProperty(t)?e[t]:e},t.prototype.set=function(t,e){return this._state[t]=e},t.prototype._clone=function(t){return JSON.parse(JSON.stringify(t))},__decorate([r.HmrState(),__metadata("design:type",Object)],t.prototype,"_state",void 0),t=__decorate([i.Injectable(),__metadata("design:paramtypes",[])],t)}();e.AppState=o},685:function(t,e){t.exports="board{display:inline-block;width:400px;height:400px}"},496:function(t,e,n){"use strict";var i=n(1),r=n(497),o=n(351),s=n(352),a=function(){function t(t){this.stateService=t}return t.prototype.slideTiles=function(t){switch(t){case 37:this.state=this.stateService.slideLeft(this.state);break;case 38:this.state=this.stateService.slideUp(this.state);break;case 39:this.state=this.stateService.slideRight(this.state);break;case 40:this.state=this.stateService.slideDown(this.state)}},__decorate([i.Input(),__metadata("design:type","function"==typeof(e="undefined"!=typeof o.State&&o.State)&&e||Object)],t.prototype,"state",void 0),__decorate([i.HostListener("document:keydown",["$event.keyCode"]),__metadata("design:type",Function),__metadata("design:paramtypes",[Object]),__metadata("design:returntype",void 0)],t.prototype,"slideTiles",null),t=__decorate([i.Component({selector:"board",encapsulation:i.ViewEncapsulation.None,directives:[r.TileComponent],template:'\n        <div class="ui grid">\n            <div class="four column row" *ngFor="let row of state.grid.rows()">\n                <div class="grey column" *ngFor="let tile of row">\n                    <tile [tile]="tile"></tile>\n                </div>\n            </div>\n        </div>\n    ',styles:[n(685)]}),__metadata("design:paramtypes",["function"==typeof(a="undefined"!=typeof s.StateService&&s.StateService)&&a||Object])],t);var e,a}();e.BoardComponent=a},686:function(t,e){t.exports="tile{position:absolute;display:block;width:72px;height:72px;line-height:36px}"},497:function(t,e,n){"use strict";var i=n(1),r=n(350),o=function(){function t(){}return t.prototype.ngOnChanges=function(){this.updateColor()},t.prototype.updateColor=function(){var t;switch(this.tile.value){case 0:t="brown";break;case 2:t="blue";break;case 4:t="teal";break;case 8:t="yellow";break;case 16:t="blue stacked";break;case 32:t="teal stacked";break;case 64:t="yellow stacked";break;case 128:t="blue tall stacked";break;case 256:t="teal tall stacked";break;case 512:t="yellow tall stacked";break;case 1024:t="orange tall stacked";break;default:t="red tall stacked"}this.class="ui "+t+" inverted segment"},__decorate([i.Input(),__metadata("design:type","function"==typeof(e="undefined"!=typeof r.Tile&&r.Tile)&&e||Object)],t.prototype,"tile",void 0),__decorate([i.HostBinding("class"),__metadata("design:type",String)],t.prototype,"class",void 0),t=__decorate([i.Component({selector:"tile",encapsulation:i.ViewEncapsulation.None,template:'<span *ngIf="!tile.isEmpty()">{{tile.value}}</span>',styles:[n(686)]}),__metadata("design:paramtypes",[])],t);var e}();e.TileComponent=o},350:function(t,e){"use strict";var n=function(){function t(t,e,n,i){this.value=t,this.x=e,this.y=n,this.merged=i,this.merged=!!i}return t.prototype.isEmpty=function(){return this.value<=0},t}();e.Tile=n},498:function(t,e,n){"use strict";function i(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}i(n(495)),i(n(232));var r=n(232);e.APP_PROVIDERS=[r.AppState]},351:function(t,e){"use strict";var n=function(){function t(){this.score=0}return t}();e.State=n},352:function(t,e,n){"use strict";var i=n(1),r=n(351),o=n(499),s=n(350),a=n(520),u=function(){function t(){this.BOARD_WIDTH=4,this.BOARD_HEIGHT=4}return t.prototype.getNewGameState=function(){var t=this,e=new r.State,n=Array.from({length:this.BOARD_WIDTH*this.BOARD_HEIGHT},function(e,n){return new s.Tile(0,n%t.BOARD_WIDTH,Math.floor(n/t.BOARD_WIDTH))});return e.grid=new a.Grid(n,this.BOARD_WIDTH,this.BOARD_HEIGHT),this.addRandomTiles(e,2)},t.prototype.addRandomTiles=function(t,e){return 0===e?t:this.addRandomTiles(this.addRandomTile(t),e-1)},t.prototype.addRandomTile=function(t){var e;if(!t.grid.rows().some(function(t){return t.some(function(t){return t.isEmpty()})}))return t;do e=t.grid.get(this.getRandomInt(0,t.grid.width),this.getRandomInt(0,t.grid.height));while(!e.isEmpty());return e.value=this.getRandomInt(0,4)>0?2:4,t},t.prototype.getRandomInt=function(t,e){return Math.floor(Math.random()*(e-t))+t},t.prototype.slideLeft=function(t){var e=this,n=new r.State;return n.grid=a.Grid.withRows(t.grid.rows().map(function(t){return e.slideTilesLeft(t)})),this.addRandomTile(n)},t.prototype.slideRight=function(t){var e=this,n=new r.State;return n.grid=a.Grid.withRows(t.grid.rows().map(function(t){return e.slideTilesLeft(t.reverse()).reverse()})),this.addRandomTile(n)},t.prototype.slideUp=function(t){var e=this,n=new r.State;return n.grid=a.Grid.withCols(t.grid.cols().map(function(t){return e.slideTilesLeft(t)})),this.addRandomTile(n)},t.prototype.slideDown=function(t){var e=this,n=new r.State;return n.grid=a.Grid.withCols(t.grid.cols().map(function(t){return e.slideTilesLeft(t.reverse()).reverse()})),this.addRandomTile(n)},t.prototype.slideTilesLeft=function(t){for(var e=t,n=1;n<=t.length;n++)e=this.slideTileLeft(e.slice(0,n)).concat(e.slice(n));return e.map(function(t){return t.merged=!1,t})},t.prototype.slideTileLeft=function(t){return this.slideTileRight(t.reverse()).reverse()},t.prototype.slideTileRight=function(t){if(t.length<=1)return t;var e=this.mergeTiles(new o.Pair(t[0],t[1])),n=t.slice(1);n[0]=e.right;var i=this.slideTileRight(n);return i.unshift(e.left),i},t.prototype.mergeTiles=function(t){var e=t.left,n=t.right;return n.isEmpty()?new o.Pair(new s.Tile(0,e.x,e.y),new s.Tile(e.value,n.x,n.y)):e.value!=n.value||n.isEmpty()||e.merged||n.merged?t:new o.Pair(new s.Tile(0,e.x,e.y),new s.Tile(2*n.value,n.x,n.y,(!0)))},t=__decorate([i.Injectable(),__metadata("design:paramtypes",[])],t)}();e.StateService=u},499:function(t,e){"use strict";var n=function(){function t(t,e){this.left=t,this.right=e}return t}();e.Pair=n},0:function(t,e,n){"use strict";function i(t){return r.bootstrap(a.App,o.PLATFORM_PROVIDERS.concat(s.ENV_PROVIDERS,a.APP_PROVIDERS)).then(s.decorateComponentRef).catch(function(t){return console.error(t)})}var r=n(336),o=n(500),s=n(501),a=n(498);e.main=i;document.addEventListener("DOMContentLoaded",function(){return i()})},353:function(t,e,n){"use strict";var i=n(1),r=n(207);e.APPLICATION_DIRECTIVES=r.REACTIVE_FORM_DIRECTIVES.slice(),e.DIRECTIVES=[{provide:i.PLATFORM_DIRECTIVES,multi:!0,useValue:e.APPLICATION_DIRECTIVES}]},354:function(t,e,n){"use strict";var i=n(1);e.APPLICATION_PIPES=[],e.PIPES=[{provide:i.PLATFORM_PIPES,multi:!0,useValue:e.APPLICATION_PIPES}]},355:function(t,e,n){"use strict";var i=n(328),r=n(207);e.APPLICATION_PROVIDERS=[r.disableDeprecatedForms(),r.provideForms()].concat(i.HTTP_PROVIDERS),e.PROVIDERS=e.APPLICATION_PROVIDERS.slice()},500:function(t,e,n){"use strict";function i(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}i(n(353)),i(n(354)),i(n(355));var r=n(353),o=n(354),s=n(355);e.PLATFORM_PROVIDERS=s.PROVIDERS.concat(r.DIRECTIVES,o.PIPES)},501:function(t,e,n){"use strict";var i=n(147),r=n(1),o=[],s=function(t){return t};i.disableDebugTools(),r.enableProdMode(),o=o.slice(),e.decorateComponentRef=s,e.ENV_PROVIDERS=o.slice()}});
//# sourceMappingURL=main.ab468959a29c803cc17f.bundle.map