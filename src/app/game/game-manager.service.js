(function() {
    'use strict';

    angular
        .module('app.game')
        .factory('gameManager', gameManager);

    gameManager.$inject = ['gridService'];

    function gameManager(gridService) {

        var service = {
            currentScore: 0,
            gameOver: false,
            gameSize: gridService.gameSize,
            grid: gridService.grid,
            highScore: 0,
            move: move,
            movesAvailable: movesAvailable,
            newGame: newGame,
            tiles: gridService.tiles,
            updateScore: updateScore,
            win: false
        };

        return service;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function move() {

        }

        function movesAvailable() {

            return gridService.anyCellsAvailable() || gridService.tileMatchesAvailable();
        }

        function newGame() {

            gridService.buildEmptyGameBoard();
            gridService.buildStartingPosition();
            reset();
        }

        function reset() {

            service.gameOver = false;
            service.win = false;
            service.currentScore = 0;
            service.highScore = 0;
        }

        function updateScore(newScore) {

        }
    }
})();