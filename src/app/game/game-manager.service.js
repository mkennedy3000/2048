(function() {
    'use strict';

    angular
        .module('game')
        .service('gameManager', gameManager);

    gameManager.$inject = ['gridService'];

    function gameManager(gridService) {

        this.newGame = newGame;
        this.move = move;
        this.updateScore = updateScore;
        this.movesAvailable = movesAvailable;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function newGame() {

        }

        function move() {

        }

        function updateScore(newScore) {

        }

        function movesAvailable() {
            return gridService.anyCellsAvailable() || gridService.tileMatchesAvailable();
        }
    }
})();