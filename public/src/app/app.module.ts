/// <reference path="../../../typings/index.d.ts" />

// import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';

//var apiConfig = require("./constants/edmunds.config")();

namespace app {

    'use strict';

    export class Config {

        static $inject: Array<string> = ['$stateProvider', '$urlRouterProvider'];

        constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider){            

            let helloState = {
                name: 'home',
                url: '/home',
                templateUrl: 'src/home/home.html'
            }

            let aboutState = {
                name: 'about',
                url: '/about',
                templateUrl: 'src/home/about.html'
            }

            let helloGalaxyState = {
                name: 'hello-galaxy',
                url: '/hello-galaxy',
                template: '<hello-galaxy></hello-galaxy>'
            }

            let demoState = {
                name: 'demo',
                url: '/demo',
                template: '<demo></demo>'
            }

            let vehicleListState = {
                name: 'vehicle-list',
                url: '/vehicles',
                template: '<vehicle-list></vehicle-list>'
            }

            let vehicleState = {
                name: 'vehicle',
                url: '/vehicles/{id}',
                template: '<vehicle></vehicle>',
                resolve: {
                    vehicle: function(dataAccessService: app.service.IDataAccessService, 
                    $stateParams: ng.ui.IStateParams){
                        var x = dataAccessService.getApiInfo();
                        return dataAccessService.getVehicle($stateParams.id);
                    }
                }
            }

            let thingsState = {
                name: 'things',
                url: '/things',
                template: '<things></things>'
            }

            $stateProvider.state(helloState);
            $stateProvider.state(aboutState);
            $stateProvider.state(helloGalaxyState);
            $stateProvider.state(demoState);
            $stateProvider.state(vehicleListState);
            $stateProvider.state(vehicleState);
            $stateProvider.state(thingsState);

            $urlRouterProvider.otherwise('/');
        }
    }

    export class ApiConstants {

        public apiInfo: any;

        static $inject: Array<string> = ['dataAccessService'];        
        constructor(dataAccessService: app.service.IDataAccessService){    
            dataAccessService.getApiInfo().then((response:any ) => {
                this.apiInfo = response;
            })
        }

        public getApiInfo() {
            return this.apiInfo;
        }
    }

    angular
        .module('app', [
            'app.entity',
            'app.demo',
            'app.galaxy',            
            'ui.router',
            'app.vehicle'
        ])        
        .config(Config);
        //.constant('apiConstants', () => ApiConstants);        

    // your app setup here
}