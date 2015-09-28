(function() {
    'use strict';

    angular
        .module('app.game')
        .factory('gameManager', gameManager);

    gameManager.$inject = ['gridService'];

    function gameManager(gridService) {

        var service = {
            gameSize: gridService.gameSize,
            grid: gridService.grid,
            move: move,
            movesAvailable: movesAvailable,
            newGame: newGame,
            tiles: gridService.tiles,
            updateScore: updateScore
        };

        return service;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function move() {

        }

        function movesAvailable() {
            return gridService.anyCellsAvailable() || gridService.tileMatchesAvailable();
        }

        function newGame() {

        }

        function updateScore(newScore) {

        }
    }
})();