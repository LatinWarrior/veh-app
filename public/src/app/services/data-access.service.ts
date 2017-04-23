/// <reference path="../../../../typings/index.d.ts" />

//import { IVehicle } from '.././entities/vehicle.entity';
//import { Http } from 'angular'

namespace app.service {

    export interface IDataAccessService {
        getVehicles(): ng.IPromise<Array<app.entity.IVehicle>>;
        getVehicle(id: number): ng.IPromise<app.entity.IVehicle>;
        getApiInfo: () => ng.IPromise<any>;
    }

    export class DataAccessService implements IDataAccessService {

        /*
        * Retrieves the Vehicle data from local file.
        */

        private vehiclesUrl: string = '.././data/makes.json';
        private vehicleUrl: string = 'https://api.edmunds.com/api/vehicle/v2/honda/models?fmt=json&api_key=';
        private apiKeyUrl: string = '.././constants/edmunds.config.json';

        static $inject = ['$http'];
        constructor(private $http: ng.IHttpProvider) {
            console.log(`In constructor of data-access.services`);
        }

        getVehicles: () => ng.IPromise<Array<app.entity.IVehicle>> = () => {
            return this
                .$http
                .get(this.vehiclesUrl)
                .then((response: any) => {
                    const vehicles = response.data.makes as Array<app.entity.IVehicle>;
                    console.log(`In getVehicles of data-access.services. vehicles: ${vehicles}`);
                    return vehicles;
                });
        }

        getVehicle: (id: number) => ng.IPromise<app.entity.IVehicle> = (id: number) => {

            this.getApiInfo().then((response: any) => {
                let api = response.data.config;
                let url = this.vehicleUrl + api.key;
                return this.$http.get(url).then((response: any) => {
                    return response.data.models;
                });
            });
        }

        getApiInfo: () => ng.IPromise<any> = () => {
            return this.$http.get(this.apiKeyUrl).then((response: any) => {
                return response;
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

