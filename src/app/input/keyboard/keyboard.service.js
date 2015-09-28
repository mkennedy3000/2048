(function() {
    'use strict';

    angular
        .module('app.input.keyboard')
        .factory('keyboardService', keyboardService);

    keyboardService.$inject = ['$document', '_', 'DIRECTION', 'KEY_CODE_TO_DIRECTION'];

    function keyboardService($document, _, DIRECTION, KEY_CODE_TO_DIRECTION) {

        var service = {
            keyEventHandlers: [],
            on: on
        };

        activate();

        return service;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function activate() {

            $document.bind('keydown', function(e) {

                var direction = KEY_CODE_TO_DIRECTION[e.which];
                if (!_.isUndefined(direction)) {
                    e.preventDefault();
                    handleKeyEvent(direction, e);
                }
            })
        }

        function handleKeyEvent(dir, e) {

            e.preventDefault();
            _.forEach(service.keyEventHandlers, function(cb) {

                cb(dir, e);
            });
        }

        function on(cb) {

            service.keyEventHandlers.push(cb);
        }
    }
})();