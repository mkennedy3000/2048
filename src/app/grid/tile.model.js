(function() {
    'use strict';

    angular
        .module('app.grid')
        .factory('Tile', Tile);

    Tile.$inject = ['uniqueIdService'];

    function Tile(uniqueIdService) {

        var Tile = function(pos, val) {
            this.id = uniqueIdService.next();
            this.merged = null;
            this.x = pos.x;
            this.y = pos.y;
            this.value = val || 2;
        };

        Tile.prototype.updatePosition = updatePosition;
        Tile.prototype.reset = reset;

        return Tile;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function updatePosition(newPos) {

            this.x = newPos.x;
            this.y = newPos.y;
        }

        function reset() {

            this.merged = null;
        }
    }
})();