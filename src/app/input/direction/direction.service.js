(function() {
    'use strict';

    angular
        .module('app.input.direction')
        .factory('directionService', directionService);

    directionService.$inject = ['_', 'DIRECTION', 'KEY_CODE_TO_DIRECTION'];

    function directionService(_, DIRECTION, KEY_CODE_TO_DIRECTION) {

        var directionToVector;

        var self = {
            getDirectionForKeyCode: getDirectionForKeyCode,
            getVectorForDirection: getVectorForDirection
        };

        activate();

        return self;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function activate() {

            _createDirectionToVectorMap();
        }

        function _createDirectionToVectorMap() {

            directionToVector = {};
            directionToVector[DIRECTION.LEFT] = { x: -1, y: 0};
            directionToVector[DIRECTION.RIGHT] = { x: 1, y: 0};
            directionToVector[DIRECTION.UP] = { x: 0, y: -1};
            directionToVector[DIRECTION.DOWN] = { x: 0, y: 1};
        }

        function getDirectionForKeyCode(keycode) {

            return _.get(KEY_CODE_TO_DIRECTION, keycode, null);
        }

        function getVectorForDirection(direction) {

            return _.get(directionToVector, direction, null);
        }
    }
})();