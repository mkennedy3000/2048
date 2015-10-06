describe('app.grid.gridService', function () {

    // Inject the Grid module into this test
    beforeEach(module('app.grid'));

    // Instance of gameManager
    var gridService;
    beforeEach(inject(function (_gridService_) {

        gridService = _gridService_;
    }));

    describe('.buildEmptyGameBoard', function () {

        var nullArr;

        beforeEach(function () {

            nullArr = [];
            for (var x = 0; x < 16; x++) {
                nullArr.push(null);
            }
        });

        it('should clear out the grid array with nulls', function () {

            var grid = [];
            for (var x = 0; x < 16; x++) {
                grid.push(x);
            }
            gridService.grid = grid;
            gridService.buildEmptyGameBoard();
            expect(gridService.grid).toEqual(nullArr);
        });

        it('should clear out the tiles array with nulls', function () {

            var tiles = [];
            for (var x = 0; x < 16; x++) {
                tiles.push(x);
            }
            gridService.tiles = tiles;
            gridService.buildEmptyGameBoard();
            expect(gridService.tiles).toEqual(nullArr);
        });
    });

});