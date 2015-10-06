(function() {
    'use strict';

    var DIRECTION = {
        UP: 'up',
        RIGHT: 'right',
        DOWN: 'down',
        LEFT: 'left'
    };

    var KEY_CODE_TO_DIRECTION = {
        // Arrow keys
        37: DIRECTION.LEFT,
        38: DIRECTION.UP,
        39: DIRECTION.RIGHT,
        40: DIRECTION.DOWN,
        // WASD
        65: DIRECTION.LEFT,
        87: DIRECTION.UP,
        68: DIRECTION.RIGHT,
        83: DIRECTION.DOWN
    };

    angular
        .module('app.input.direction')
        .constant('DIRECTION', DIRECTION)
        .constant('KEY_CODE_TO_DIRECTION', KEY_CODE_TO_DIRECTION);
})();