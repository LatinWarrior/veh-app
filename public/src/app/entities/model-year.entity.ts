
export interface IModelYear {
    id: number;
    year: number;
}

export default class ModelYear implements IModelYear {
    constructor(public id: number, public year: number) {

    }
}
