/// <reference path="../../../../typings/index.d.ts" />

// import { IVehicle } from '.././entities/vehicle.entity';
// import { IDataAccessService, DataAccessService } from '.././services/data-access.service';

namespace app.vehicle {

    'use strict';

    interface IVehicleListBindings {

    }
// 
    interface IVehicleListController extends IVehicleListBindings {

    }

    class VehicleListController implements IVehicleListController {

        private vehicles: Array<app.entity.IVehicle>;

        static $inject = ['dataAccessService', '$http'];
        constructor(private dataAccessService: app.service.IDataAccessService) {
            console.log('In constructor of VehicleListController');
        }

        $onInit: () => void = () => {

            console.log('In $onInit of VehicleListController');

            this
                .dataAccessService
                .getVehicles()
                .then((vehicles: Array<app.entity.IVehicle>) => {
                    console.log(`In $onInit. vehicles: ${vehicles}`);
                    this.vehicles = vehicles;
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
            this.templateUrl = './vehicle-list.component.html'
        }
    }

    angular
        .module('app.vehicle')
        .component('vehicleList', () => new VehicleListComponent());
}