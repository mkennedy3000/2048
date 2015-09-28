(function() {
    'use strict';

    angular
        .module('app.grid')
        .directive('2048Tile', tile);

    function tile() {

        return {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            templateUrl: 'grid/tile.html'
        }
    }
})();