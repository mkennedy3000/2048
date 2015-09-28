(function() {
    'use strict';

    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['gameManager'];

    function GameController(gameManager) {

        var vm = this;

        vm.game = gameManager;
    }
})();