/// <reference path="../../../typings/index.d.ts" />

// import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';

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
            $stateProvider.state(thingsState);

            $urlRouterProvider.otherwise('/');
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
        // .config(function ($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) {

        //     let helloState = {
        //         name: 'home',
        //         url: '/home',
        //         templateUrl: 'src/home/home.html'
        //     }

        //     let aboutState = {
        //         name: 'about',
        //         url: '/about',
        //         templateUrl: 'src/home/about.html'
        //     }

        //     let helloGalaxyState = {
        //         name: 'hello-galaxy',
        //         url: '/hello-galaxy',
        //         template: '<hello-galaxy></hello-galaxy>'
        //     }

        //     let demoState = {
        //         name: 'demo',
        //         url: '/demo',
        //         templateUrl: 'src/demo/demo.html'
        //     }

        //     let vehicleListState = {
        //         name: 'vehicle-list',
        //         url: '/vehicles',
        //         template: '<vehicle-list></vehicle-list>'
        //     }

        //     let thingsState = {
        //         name: 'things',
        //         url: '/things',
        //         template: '<things></things>'
        //     }

        //     $stateProvider.state(helloState);
        //     $stateProvider.state(aboutState);
        //     $stateProvider.state(helloGalaxyState);
        //     $stateProvider.state(demoState);
        //     $stateProvider.state(vehicleListState);
        //     $stateProvider.state(thingsState);

        //     $urlRouterProvider.otherwise('/');
        // });

    // your app setup here
}