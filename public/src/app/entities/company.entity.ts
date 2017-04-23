
namespace app.entity {

     'use strict';

    export interface ICompany {
        id: number;
        name: string;
    }

    export class Company implements ICompany {
        constructor(public id: number, public name: string) {

        }
    }

   angular.module('app.entity');    
}

//export { ICompany, Company}
