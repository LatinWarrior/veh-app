namespace app.entity{

    export interface IVehicle {
        id: number;
        name: string;
        niceName: string;
        models: Array<app.entity.IVehicleModel>;
    }

    export class Vehicle implements IVehicle {
        constructor(public id: number, public name: string, public niceName: string, public models: Array<IVehicleModel>) {

        }
    }

    angular.module('app.entity');
}
