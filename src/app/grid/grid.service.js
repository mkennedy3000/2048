(function () {
    'use strict';

    angular
        .module('app.grid')
        .factory('gridService', gridService);

    gridService.$inject = ['Tile', '_'];

    function gridService(Tile, _) {

        var service = {
            anyCellsAvailable: anyCellsAvailable,
            availableCells: availableCells,
            buildEmptyGameBoard: buildEmptyGameBoard,
            buildStartingPosition: buildStartingPosition,
            grid: [],
            insertTile: insertTile,
            numStartingTiles: 2,
            randomAvailableCell: randomAvailableCell,
            randomlyInsertNewTile: randomlyInsertNewTile,
            removeTile: removeTile,
            size: 4,
            tileMatchesAvailable: tileMatchesAvailable,
            tiles: []
        };

        activate();

        return service;

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
            for (var x = 0; x < service.size * service.size; x++) {
                service.grid[x] = null;
            }

            // Initialize our tile array with a bunch of null objects
            forEachCell(function (x, y) {
                setCellAt({x: x, y: y}, null);
            });
        }

        function buildStartingPosition() {

            for (var x = 0; x < service.numStartingTiles; x++) {
                randomlyInsertNewTile();
            }
        }

        function coordinatesToPosition(pos) {
            return (pos.y * service.size) + pos.x;
        }

        function forEachCell(cb) {

            var totalSize = service.size * service.size;
            for (var i = 0; i < totalSize; i++) {
                var pos = positionToCoordinates(i);
                cb(pos.x, pos.y, service.tiles[i]);
            }
        }

        function getCellAt(pos) {

            if (withinGrid(pos)) {
                var x = coordinatesToPosition(pos);
                return service.tiles[x];
            } else {
                return null;
            }
        }

        function insertTile(tile) {

            var pos = coordinatesToPosition(tile);
            service.tiles[pos] = tile;
        }

        function positionToCoordinates(i) {

            var x = i % service.size,
                y = (i - x) / service.size;

            return {
                x: x,
                y: y
            };
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
            service.tiles[pos] = null;
        }

        function setCellAt(pos, tile) {

            if (withinGrid(pos)) {
                service.tiles[coordinatesToPosition(pos)] = tile;
            }
        }

        function tileMatchesAvailable() {

        }

        function withinGrid(cell) {

            return cell.x >= 0 && cell.x < service.size && cell.y >= 0 && cell.y < service.size;
        }
    }
})();