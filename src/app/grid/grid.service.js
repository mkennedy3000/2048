(function() {
    'use strict';

    angular
        .module('grid')
        .service('gridService', gridService);

    function gridService() {

        this.anyCellsAvailable = anyCellsAvailable;
        this.grid = [];
        this.size = 4;
        this.tileMatchesAvailable = tileMatchesAvailable;
        this.tiles = [];

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function anyCellsAvailable() {

        }

        function tileMatchesAvailable() {

        }
    }
})();