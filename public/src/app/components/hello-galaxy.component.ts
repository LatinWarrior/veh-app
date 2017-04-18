/// <reference path="../../../../typings/index.d.ts" />

module app.galaxy {

    'use strict';

    angular
        .module('app.galaxy')
        .component('helloGalaxy', {
            bindings: {

            },
            templateUrl: 'src/app/components/hello-galaxy.component.html',
            controller: function () {
                this.greeting = 'hello';

                this.toggleGreeting = function () {
                    this.greeting = (this.greeting === 'hello') ? 'what\'s up' : 'hello';
                }
            }
        });

}