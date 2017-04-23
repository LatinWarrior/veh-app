/// <reference path="../../../../typings/index.d.ts" />

//import { IVehicle } from '.././entities/vehicle.entity';
//import { Http } from 'angular'

namespace app.service {

    export interface IDataAccessService {
        getVehicles(): ng.IPromise<Array<app.entity.IVehicle>>;
        getVehicle(id: number): ng.IPromise<app.entity.IVehicle>;
        // getApiInfo: () => ng.IPromise<any>;
    }

    export class DataAccessService implements IDataAccessService {

        /*
        * Retrieves the Vehicle data from local file.
        */

        private vehiclesUrl: string = '.././data/makes.json';
        private vehicleUrl: string = 'https://api.edmunds.com/api/vehicle/v2/honda/models?fmt=json&api_key=';
        // private apiKeyUrl: string = '.././constants/edmunds.config.json';
        private apiKeyObj: app.entity.IApiObject;

        static $inject = ['$http', 'apiConfigService'];
        constructor(private $http: ng.IHttpProvider,
            private apiConfigService: app.api.IApiConfigService) {
            console.log(`In constructor of data-access.service`);
            this.apiConfigService
                .getApiInfo()
                .then((response: any){
                    this.apiKeyObj = response.data;
                });
        }

        getVehicles: () => ng.IPromise<Array<app.entity.IVehicle>> = () => {
            return this
                .$http
                .get(this.vehiclesUrl)
                .then((response: any) => {
                    const vehicles = response.data.makes as Array<app.entity.IVehicle>;
                    console.log(`In getVehicles of data-access.service. vehicles: ${vehicles}`);
                    return vehicles;
                });
        }

        getVehicle: (id: number) => ng.IPromise<app.entity.IVehicle> = (id: number) => {
            let api = this.apiKeyObj;
            let url = this.vehicleUrl + api.key;
            return this.$http
                .get(url)
                .then((response: any) => {
                    const models = response.data.models as app.entity.IVehicle
                    return response.data.models;
                });
            // this.getApiInfo().then((response: any) => {

            // });
        }

        // getApiInfo: () => ng.IPromise<any> = () => {
        //     return this.$http.get(this.apiKeyUrl).then((response: any) => {
        //         return response;
        //     });
        // }        
    }

    angular
        .module('app.service')
        .service('dataAccessService', DataAccessService);
}

