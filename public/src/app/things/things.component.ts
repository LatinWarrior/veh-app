/// <reference path="../../../../typings/index.d.ts" />

import { ICompany, Company } from '.././entities/company.entity';

// usage: <things></things>

module app.things {

    export interface IThings {
        getCompanies: () => ng.IPromise<Array<ICompany>>;
    }

    export class Things implements IThings {

        static $inject = ['$q'];

        constructor(private $q: ng.IQService) {

        }

        public getCompanies: () => ng.IPromise<Array<ICompany>> = () => {
            return this.$q.when(this.companies);
        }

        private companies: Array<ICompany> = [
            {
                "id": 1,
                "name": "Company 1"
            }, {
                "id": 2,
                "name": "Company 2"
            }
        ]
    }

    // const ThingsComponent = {
    //     bindings: {

    //     },
    //     controller: function () {

    //     },
    //     templateUrl: 'src/things/things.component.html'
    // }

    // angular
    //     .module('app.thing', [])
    //     .component('things', ThingsComponent);

    // export { ThingsComponent as default };

    // angular
    //     .module('app.thing', [])
    //     .component('things', ThingsComponent);

}