/// <reference path="../../../../typings/index.d.ts" />

import { IVehicle } from '.././entities/vehicle';
//import { Http } from 'angular'

    export interface IDataAccessService {
        getVehicles(): ng.IPromise<Array<IVehicle>>;
    }

    export class DataAccessService implements IDataAccessService {

        /*
        * Retrieves the Vehicle data from local file.
        */

        private vehiclesUrl: string = '.././data/makes.json';

        constructor(private $http: ng.IHttpProvider) {
            console.log(`In constructor of data-access.services`);
        }

        getVehicles: () => ng.IPromise<Array<IVehicle>> = () => {
            return this
                .$http
                .$get(this.vehiclesUrl)
                .then((response: any) => {
                    const vehicles = response.json().data as Array<IVehicle>;
                    console.log(`In getVehicles of data-access.services. vehicles: ${vehicles}`);
                    return vehicles;
                });
        }

        static vehicleService($http: ng.IHttpProvider) {
            console.log(`In static vehicleService method of data-access.services`);
            return new DataAccessService($http);
        }
    }

    DataAccessService.vehicleService.$inject = ['$http']

    angular
        .module('app.service')
        .service('dataAccessService', () => DataAccessService.vehicleService);

