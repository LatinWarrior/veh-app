/// <reference path="../../../../typings/index.d.ts" />

import { IVehicle } from '.././entities/vehicle.entity';

interface IVehicleBindings {
    vehicle: IVehicle;
}

interface IVehicleController extends IVehicleBindings {

}

class VehicleController implements IVehicleController {

    constructor(public vehicle: IVehicle) {
        console.log('In constructor of VehicleController');
    }
}

export class VehicleComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {

        console.log('In constructor of VehicleComponent');

        this.bindings = {

        };
        this.controller = VehicleController;
        this.templateUrl = 'src/app/vehicles/vehicle.component.html'
    }
}

angular
    .module('app.vehicle')
    .component('vehicle', () => new VehicleComponent());


