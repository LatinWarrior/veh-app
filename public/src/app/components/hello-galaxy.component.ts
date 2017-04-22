/// <reference path="../../../../typings/index.d.ts" />

module app.galaxy {

    'use strict';

    interface IHelloGalaxyComponentBindings {

    }

    interface IHelloGalaxyController extends IHelloGalaxyComponentBindings {

    }

    class HelloGalaxyController implements IHelloGalaxyController {

        private greeting: string;

        constructor() {
            this.greeting = 'hello';
        }

        /**
         * toggleGreeting
         */
        public toggleGreeting: () => void = () => {
            this.greeting = (this.greeting === 'hello') ? 'what\'s up' : 'hello';
        }

        // this.greeting = 'hello';

        //         this.toggleGreeting = function () {
        //             this.greeting = (this.greeting === 'hello') ? 'what\'s up' : 'hello';
        //         }
    }

    export class HelloGalaxyComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public templateUrl: string;

        constructor() {
            this.bindings = {

            };
            this.controller = HelloGalaxyController;
            this.templateUrl = './components/hello-galaxy.component.html';
        }
    }

    angular
        .module('app.galaxy')
        .component('helloGalaxy', new HelloGalaxyComponent());
}