/// <reference path="../../../../typings/index.d.ts" />

//import { IVehicle } from '.././entities/vehicle.entity';
//import { Http } from 'angular'

namespace app.service {

    export interface IDataAccessService {
        getVehicles(): ng.IPromise<Array<app.entity.IVehicle>>;
        getVehicle(id: number): ng.IPromise<app.entity.IVehicle>;
        getVehicleModels(make: string, apiKey: string): ng.IPromise<Array<app.entity.IVehicleModel>>;
    }

    export class DataAccessService implements IDataAccessService {

        /*
        * Retrieves the Vehicle data from local file.
        */

        private vehiclesUrl: string = '.././data/makes.json';
        private vehicleUrl: string = 'https://api.edmunds.com/api/vehicle/v2/honda/models?fmt=json&api_key=';
        private edmundsApiUrl: string = 'https://api.edmunds.com/api/vehicle/v2/'
        private apiKeyObj: app.entity.IApiObject;
        private urlSuffix: string = '?fmt=json&api_key='

        static $inject = ['$http', 'apiConfigService'];
        constructor(private $http: ng.IHttpProvider,
            private apiConfigService: app.api.IApiConfigService) {
            console.log(`In constructor of data-access.service`);
            this.apiConfigService
                .getApiInfo()
                .then((response: any) => {
                    this.apiKeyObj = response.data as app.entity.IApiObject;
                }, (error: any) => {
                    console.log('error: ', error);
                });
        }

        getVehicles: () => ng.IPromise<Array<app.entity.IVehicle>> = () => {
            return this
                .$http
                .get(this.vehiclesUrl)
                .then((response: any) => {
                    const vehicles = response.data.makes as Array<app.entity.IVehicle>;
                    // console.log(`In getVehicles of data-access.service. vehicles: ${vehicles}`);
                    return vehicles;
                }, (error: any) => {
                    console.log('error: ', error);
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
                }, (error: any) => {
                    console.log('error: ', error);
                });
        }

        getVehicleModels: (make: string, apiKey: string) => ng.IPromise<Array<app.entity.IVehicleModel>> = (make: string, apiKey: string) => {

            //let api = this.apiKeyObj;
            let url = this.edmundsApiUrl + make + '/models' + this.urlSuffix + apiKey;

            return this
                .$http
                .get(url)
                .then((response: any) => {
                    const vehicleModels = response.data.models as Array<app.entity.IVehicleModel>;
                    // console.log(`In getVehicleModels of data-access.service. vehicleModels: ${vehicleModels}`);
                    return vehicleModels;
                });
        }
    }

    angular
        .module('app.service')
        .service('dataAccessService', DataAccessService);
}

