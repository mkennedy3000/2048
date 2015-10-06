(function() {
    'use strict';

    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['$scope', 'gameManager', 'keyboardService'];

    function GameController($scope, gameManager, keyboardService) {

        var vm = this;

        vm.game = gameManager;
        vm.newGame = newGame;
        vm.startGame = startGame;
        vm.hideWinOverlay = hideWinOverlay;

        activate();

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function activate() {

            newGame();
        }

        function hideWinOverlay() {

            $('#you-win').addClass('ng-hide');
        }

        function newGame() {

            vm.game.newGame();
            startGame();
        }

        function startGame() {

            keyboardService.on(function(dir) {
                $scope.$apply(vm.game.move(dir));
            });
        }
    }
})();