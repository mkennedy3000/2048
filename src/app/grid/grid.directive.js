(function() {
    'use strict';

    angular
        .module('grid')
        .directive('2048Grid', grid);

    function grid() {

        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                ngModel: '='
            },
            templateUrl: 'grid/grid.html'
        }
    }
})();