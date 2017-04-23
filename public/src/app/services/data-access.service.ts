/// <reference path="../../../../typings/index.d.ts" />

//import { IVehicle } from '.././entities/vehicle.entity';
//import { Http } from 'angular'

namespace app.service {

    export interface IDataAccessService {
        getVehicles(): ng.IPromise<Array<app.entity.IVehicle>>;
    }

    export class DataAccessService implements IDataAccessService {

        /*
        * Retrieves the Vehicle data from local file.
        */

        private vehiclesUrl: string = '.././data/makes.json';
        static $inject = ['$http'];
        constructor(private $http: ng.IHttpProvider) {
            console.log(`In constructor of data-access.services`);
        }

        getVehicles: () => ng.IPromise<Array<app.entity.IVehicle>> = () => {
            return this
                .$http
                .get(this.vehiclesUrl)
                .then((response: any) => {
                    const vehicles = response.data as Array<app.entity.IVehicle>;
                    console.log(`In getVehicles of data-access.services. vehicles: ${vehicles}`);
                    return vehicles;
                });
        }

        // static vehicleService($http: ng.IHttpProvider) {
        //     console.log(`In static vehicleService method of data-access.services`);
        //     return new DataAccessService($http);
        // }
    }

    //DataAccessService.vehicleService.$inject = ['$http']

    angular
        .module('app.service')
        .service('dataAccessService', DataAccessService);
}

