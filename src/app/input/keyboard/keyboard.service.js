(function() {
    'use strict';

    angular
        .module('app.input.keyboard')
        .factory('keyboardService', keyboardService);

    keyboardService.$inject = ['$document', '_', 'directionService'];

    function keyboardService($document, _, directionService) {

        var service = {
            keyEventHandlers: [],
            on: on
        };

        activate();

        return service;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function activate() {

            $document.bind('keydown', function(e) {

                var direction = directionService.getDirectionForKeyCode(e.which);
                if (!_.isNull(direction)) {
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