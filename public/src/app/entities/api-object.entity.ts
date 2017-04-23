
namespace app.entity {

     'use strict';

    export interface IApiObject {
        key: string;
        secret: string;
    }

    export class ApiObject implements IApiObject {
        constructor(public key: number, public secret: string) {

        }
    }

   angular.module('app.entity');    
}

//export { ICompany, Company}
