import { IModelYear } from './model-year.entity';

export interface IVehicleModel {
    id: string;
    name: string;
    niceName: string;
    years: Array<IModelYear>;
}

export default class VehicleModel implements IVehicleModel {
    constructor(public id: string, public name: string, public niceName: string, public years: Array<IModelYear>) {

    }
}
