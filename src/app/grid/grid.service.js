(function () {
    'use strict';

    angular
        .module('app.grid')
        .factory('gridService', gridService);

    gridService.$inject = ['Tile', '_', 'directionService'];

    function gridService(Tile, _, directionService) {

        var self = {
            anyCellsAvailable: anyCellsAvailable,
            availableCells: availableCells,
            buildEmptyGameBoard: buildEmptyGameBoard,
            buildStartingPosition: buildStartingPosition,
            calculateNextPosition: calculateNextPosition,
            getCellAt: getCellAt,
            grid: [],
            insertTile: insertTile,
            moveTile: moveTile,
            newTile: newTile,
            numStartingTiles: 2,
            prepareTiles: prepareTiles,
            randomAvailableCell: randomAvailableCell,
            randomlyInsertNewTile: randomlyInsertNewTile,
            removeTile: removeTile,
            samePositions: samePositions,
            size: 4,
            tileMatchesAvailable: tileMatchesAvailable,
            tiles: [],
            traversalDirections: traversalDirections
        };

        activate();

        return self;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function activate() {
            buildEmptyGameBoard();
            buildStartingPosition();
        }

        function anyCellsAvailable() {
            return !_.isEmpty(availableCells());
        }

        function availableCells() {

            var cells = [];
            forEachCell(function(x, y) {
                var pos = {x: x, y: y};
                if (_.isNull(getCellAt(pos))) {
                    cells.push(pos);
                }
            });

            return cells;
        }

        function buildEmptyGameBoard() {

            // Initialize our grid
            for (var x = 0; x < self.size * self.size; x++) {
                self.grid[x] = null;
            }

            // Initialize our tile array with a bunch of null objects
            forEachCell(function (x, y) {
                setCellAt({x: x, y: y}, null);
            });
        }

        function buildStartingPosition() {

            for (var x = 0; x < self.numStartingTiles; x++) {
                randomlyInsertNewTile();
            }
        }

        function calculateNextPosition(cell, dir) {

            var vector = directionService.getVectorForDirection(dir);
            var previous;

            do {
                previous = cell;
                cell = {
                    x: previous.x + vector.x,
                    y: previous.y + vector.y
                };
            } while (withinGrid(cell) && cellAvailable(cell));

            return {
                newPosition: previous,
                next: getCellAt(cell)
            };
        }

        function cellAvailable(cell) {

            return _.isNull(getCellAt(cell));
        }

        function coordinatesToPosition(pos) {
            return (pos.y * self.size) + pos.x;
        }

        function forEachCell(cb) {

            var totalSize = self.size * self.size;
            for (var i = 0; i < totalSize; i++) {
                var pos = positionToCoordinates(i);
                cb(pos.x, pos.y, self.tiles[i]);
            }
        }

        function getCellAt(pos) {

            if (withinGrid(pos)) {
                var x = coordinatesToPosition(pos);
                return self.tiles[x];
            } else {
                return null;
            }
        }

        function insertTile(tile) {

            var pos = coordinatesToPosition(tile);
            self.tiles[pos] = tile;
        }

        function moveTile(tile, newPosition) {

            var oldPos = {
                x: tile.x,
                y: tile.y
            };

            // Update array location
            setCellAt(oldPos, null);
            setCellAt(newPosition, tile);
            // Update tile model
            tile.updatePosition(newPosition);
        }

        function newTile(pos, value) {

            return new Tile(pos, value);
        }

        function positionToCoordinates(i) {

            var x = i % self.size,
                y = (i - x) / self.size;

            return {
                x: x,
                y: y
            };
        }

        function prepareTiles() {

            forEachCell(function(x, y, tile) {
                if (!_.isNull(tile)) {
                    tile.reset();
                }
            });
        }

        function randomAvailableCell() {

            var cells = availableCells();
            if (!_.isEmpty(cells)) {
                return cells[_.random(cells.length - 1)];
            }
        }

        function randomlyInsertNewTile() {

            var cell = randomAvailableCell(),
                tile = new Tile(cell, 2);

            insertTile(tile);
        }

        function removeTile(tile) {

            var pos = coordinatesToPosition(tile);
            self.tiles[pos] = null;
        }

        function samePositions(a, b) {

            return a.x === b.x && a.y === b.y;
        }

        function setCellAt(pos, tile) {

            if (withinGrid(pos)) {
                self.tiles[coordinatesToPosition(pos)] = tile;
            }
        }

        function tileMatchesAvailable() {

        }

        function traversalDirections(direction) {

            var vector = directionService.getVectorForDirection(direction);
            var positions = {x: [], y: []};
            for (var i = 0; i < self.size; i++) {
                positions.x.push(i);
                positions.y.push(i);
            }

            // Reorder if we're going right
            if (vector.x > 0) {
                positions.x = positions.x.reverse();
            }

            // Reorder the y positions if we're going down
            if (vector.y > 0) {
                positions.y = positions.y.reverse();
            }

            return positions;
        }

        function withinGrid(cell) {

            return cell.x >= 0 && cell.x < self.size && cell.y >= 0 && cell.y < self.size;
        }
    }
})();