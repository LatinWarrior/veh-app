import { IVehicleModel } from './vehicle-model.entity';

export interface IVehicle {
    id: number;
    name: string;
    niceName: string;
    models: Array<IVehicleModel>;
}

export default class Vehicle implements IVehicle {
    constructor(public id: number, public name: string, public niceName: string, public models: Array<IVehicleModel>) {

    }
}
