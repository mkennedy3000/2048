(function() {
    'use strict';

    angular
        .module('app.game')
        .factory('gameManager', gameManager);

    gameManager.$inject = ['_', 'gridService', '$cookieStore'];

    function gameManager(_, gridService, $cookieStore) {

        var self = {
            currentScore: 0,
            gameOver: false,
            gameSize: gridService.gameSize,
            grid: gridService.grid,
            highScore: getHighScore(),
            move: move,
            movesAvailable: movesAvailable,
            newGame: newGame,
            tiles: gridService.tiles,
            updateScore: updateScore,
            win: false,
            winningValue: 2048
        };

        return self;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function getHighScore() {

            return parseInt($cookieStore.get('highScore')) || 0;
        }

        function move(direction) {

            if (self.win) {
                return false;
            }

            var hasWon = false;
            var hasMoved = false;
            var positions = gridService.traversalDirections(direction);

            gridService.prepareTiles();

            _.forEach(positions.x, function(x) {
                _.forEach(positions.y, function(y) {
                    var originalPosition = {x:x, y:y};
                    var tile = gridService.getCellAt(originalPosition);

                    if (!_.isNull(tile)) {
                        var cell = gridService.calculateNextPosition(tile, direction),
                            next = cell.next;

                        if (!_.isNull(next) && next.value === tile.value && !next.merged) {
                            // Handle merged
                            var newValue = tile.value * 2;
                            var mergedTile = gridService.newTile(tile, newValue);
                            mergedTile.merged = [tile, next];

                            gridService.insertTile(mergedTile);
                            gridService.removeTile(tile);
                            gridService.moveTile(mergedTile, next);

                            updateScore(self.currentScore + newValue);

                            if (newValue >= self.winningValue) {
                                hasWon = true;
                            }
                            hasMoved = true;
                        } else {
                            // Handle moving tile
                            gridService.moveTile(tile, cell.newPosition);
                        }

                        if (!gridService.samePositions(originalPosition, cell.newPosition)) {
                            hasMoved = true;
                        }
                    }
                });
            });

            if (hasWon && !self.win) {
                self.win = true;
            }

            if (hasMoved) {
                gridService.randomlyInsertNewTile();

                if (self.win || !self.movesAvailable()) {
                    self.gameOver = true;
                }
            }
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

            self.gameOver = false;
            self.win = false;
            self.currentScore = 0;
        }

        function updateScore(newScore) {

            self.currentScore = newScore;
            if (self.currentScore > getHighScore()) {
                self.highScore = newScore;
                $cookieStore.put('highScore', newScore);
            }
        }
    }
})();