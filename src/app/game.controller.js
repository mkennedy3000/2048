(function() {
    'use strict';

    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['gameManager', 'keyboardService'];

    function GameController(gameManager, keyboardService) {

        var vm = this;

        vm.game = gameManager;
        vm.newGame = newGame;
        vm.startGame = startGame;

        activate();

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function activate() {

            newGame();
        }

        function newGame() {

            vm.game.newGame();
            startGame();
        }

        function startGame() {

            keyboardService.on(function(dir) {
                console.log(dir);
            });
        }
    }
})();