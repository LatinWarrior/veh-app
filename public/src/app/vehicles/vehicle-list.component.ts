/// <reference path="../../../../typings/index.d.ts" />

namespace app.vehicle {

    'use strict';

    interface IVehicleListBindings {

    }
    // 
    interface IVehicleListController extends IVehicleListBindings {
        //vehicles: Array<app.entity.IVehicle>;
        title: string;
    }

    class VehicleListController implements IVehicleListController {

        private vehicles: Array<app.entity.IVehicle>;
        public title: string;

        static $inject = ['dataAccessService'];
        constructor(private dataAccessService: app.service.IDataAccessService) {
            console.log('In constructor of VehicleListController');
        }

        $onInit: () => void = () => {

            console.log('In $onInit of VehicleListController');

            this.title = "Vehicles";

            this.dataAccessService
                .getVehicles()
                .then((vehicles: Array<app.entity.IVehicle>) => {                    
                    this.vehicles = vehicles;
                }, (error: any) => {
                    console.log('error: ', error);
                });
        }

        $onChanges: (changes: any) => void = (changes: any) => {
            console.log(`In $onChanges. changes: ${changes}`);
        }
    }

    export class VehicleListComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public templateUrl: string;
        // public selector: string;

        constructor() {

            console.log(`In constructor of VehicleListComponent`);

            // this.selector: '<vehicle-list></vehicle-list>';
            this.bindings = {

            };
            this.controller = VehicleListController;
            this.templateUrl = './vehicles/vehicle-list.component.html'
        }
    }

    angular
        .module('app.vehicle')
        .component('vehicleList', new VehicleListComponent());
}