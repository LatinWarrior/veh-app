// public/src/app/entities/model-year.entity.ts

namespace app.entity {

    export interface IModelYear {
        id: number;
        year: number;
    }

    export class ModelYear implements IModelYear {
        constructor(public id: number, public year: number) {

        }
    }

    angular.module('app.entity');
}
