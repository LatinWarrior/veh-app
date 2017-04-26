/// <reference path="../../../../typings/index.d.ts" />

namespace app.vehicle {

    'use strict';

    interface IVehicleModelListBindings {        
        vehicleModels: Array<app.entity.IVehicleModel>;
    }

    interface IVehicleModelListController extends IVehicleModelListBindings {        
        title: string;
    }

    class VehicleModelListController implements IVehicleModelListController {

        public vehicleModels: Array<app.entity.IVehicleModel>;
        public title: string;        
        public make: string;

        static $inject = ['dataAccessService'];
        constructor(private dataAccessService: app.service.IDataAccessService) {
            console.log('In constructor of VehicleListController');
        }

        $onInit: () => void = () => {

            console.log('In $onInit of VehicleModelListController');

            this.title = "Vehicle Models";

            // this.dataAccessService
            //     .getVehicleModels(this.make)
            //     .then((vehicleModels: Array<app.entity.IVehicleModel>) => {
            //         console.log(`In $onInit. vehicleModels: ${vehicleModels}`);
            //         this.vehicleModels = vehicleModels;
            //     });
        }
    }

    export class VehicleModelListComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public templateUrl: string;        

        constructor() {

            console.log(`In constructor of VehicleModelListComponent`);

            // this.selector: '<vehicle-list></vehicle-list>';
            this.bindings = {
                vehicleModels: '<'
            };
            this.controller = VehicleModelListController;
            this.templateUrl = './vehicles/vehicle-model-list.component.html'
        }
    }

    angular
        .module('app.vehicle')
        .component('vehicleModelList', new VehicleModelListComponent());

}