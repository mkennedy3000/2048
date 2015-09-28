describe('app.game.gameManager', function () {

    // Inject the Game module into this test
    beforeEach(module('app.game'));

    // Mock gridService
    var _gridService;
    beforeEach(module(function ($provide) {

        _gridService = {
            anyCellsAvailable: angular.noop,
            tileMatchesAvailable: angular.noop
        };

        $provide.value('gridService', _gridService);
    }));

    // Instance of gameManager
    var gameManager;
    beforeEach(inject(function (_gameManager_) {

        gameManager = _gameManager_;
    }));

    describe('.movesAvailable', function () {

        it('should report true if there are cells available', function () {

            spyOn(_gridService, 'anyCellsAvailable').and.returnValue(true);

            expect(gameManager.movesAvailable()).toBeTruthy();
        });

        it('should report true if there are matches available', function() {

            spyOn(_gridService, 'anyCellsAvailable').and.returnValue(false);
            spyOn(_gridService, 'tileMatchesAvailable').and.returnValue(true);

            expect(gameManager.movesAvailable()).toBeTruthy();
        });

        it('should report false if there are no cells nor matches available', function() {

            spyOn(_gridService, 'anyCellsAvailable').and.returnValue(false);
            spyOn(_gridService, 'tileMatchesAvailable').and.returnValue(false);

            expect(gameManager.movesAvailable()).toBeFalsy();
        });
    });
});