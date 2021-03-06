namespace app.entity {

    export interface IVehicleModel {
        id: string;
        name: string;
        niceName: string;
        years: Array<app.entity.IModelYear>;
    }

    export class VehicleModel implements IVehicleModel {
        constructor(public id: string, public name: string, public niceName: string, public years: Array<IModelYear>) {

        }
    }

    angular.module('app.entity');
}
