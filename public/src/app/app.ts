/// <reference path="../../../typings/index.d.ts" />


// import 'angular-ui-router';

module app {

    'use strict';

    // class Config{
    //     static $inject = ['$stateProvider'];

    //     constructor($stateProvider: angular.ui.IStateProvider){
    //          let helloState = {
    //             name: 'home',
    //             url: '/home',
    //             templateUrl: 'src/home/home.html'
    //         }

    //         let aboutState = {
    //             name: 'about',
    //             url: '/about',
    //             templateUrl: 'src/home/about.html'
    //         }

    //         let helloGalaxyState = {
    //             name: 'hello-galaxy',
    //             url: '/hello-galaxy',
    //             template: '<hello-galaxy></hello-galaxy>'
    //         }

    //         let demoState = {
    //             name: 'demo',
    //             url: '/demo',
    //             templateUrl: 'src/demo/demo.html'
    //         }

    //         let vehicleListState = {
    //             name: 'vehicle-list',
    //             url: '/vehicles',
    //             template: '<vehicle-list></vehicle-list>'
    //         }

    //         let thingState = {
    //             name: 'thing',
    //             url: '/things',
    //             template: '<thing></thing>'
    //         }

    //         $stateProvider.state(helloState);
    //         $stateProvider.state(aboutState);
    //         $stateProvider.state(helloGalaxyState);
    //         $stateProvider.state(demoState);
    //         $stateProvider.state(vehicleListState);   
    //         $stateProvider.state(thingState);       
    //     }
    // }

    angular
        .module('app', [
            'app.demo',
            'app.galaxy',
            'app.templates',
            'ui.router',
            'app.vehicle'
        ])
        // .config(Config);
        .config(function ($stateProvider: any, $urlRouterProvider: any) {

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
                templateUrl: 'src/demo/demo.html'
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
        });

    // your app setup here

}