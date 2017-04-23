/// <reference path="../../../../typings/index.d.ts" />

module app.demo {

    'use strict';

    interface IDemoBindings {

    }

    interface IDemoController extends IDemoBindings {
        public getExcited: boolean = false;
    }

    class DemoController implements IDemoController {

        public getExcited: boolean = false;

        constructor() {

        }
    }    

    export class DemoComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public templateUrl: string;

        constructor() {
            this.bindings = {

            };
            this.controller = DemoController;
            this.templateUrl = './DemoService.html'
        }
    }

    angular
        .module('app.demo')
        .component("demo", [() => new DemoComponent()]);
}
