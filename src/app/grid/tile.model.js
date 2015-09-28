(function() {
    'use strict';

    angular
        .module('app.grid')
        .factory('Tile', Tile);

    function Tile() {

        var Tile = function(pos, val) {
            this.x = pos.x;
            this.y = pos.y;
            this.value = val || 2;
        };

        return Tile;
    }
})();