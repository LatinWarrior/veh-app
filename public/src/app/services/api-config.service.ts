/// <reference path="../../../../typings/index.d.ts" />

namespace app.api {

    export interface IApiConfigService {        
        getApiInfo: () => ng.IPromise<any>;
    }

    export class ApiConfigService implements IApiConfigService {

        /*
        * Retrieves the API data from local file.
        */       
        private apiKeyUrl: string = '.././constants/edmunds.config.json';

        static $inject = ['$http'];
        constructor(private $http: ng.IHttpProvider) {
            console.log(`In constructor of api-config.service`);
        }
        
        getApiInfo: () => ng.IPromise<app.entity.IApiObject> = () => {
            return this.$http.get(this.apiKeyUrl).then((response: any) => {
                const apiKeyObject = response.data.config as app.entity.IApiObject;
                console.log(`In getApiInfo of api-config.service. apiKeyObject: ${apiKeyObject}`);
                return apiKeyObject;
            });
        }        
    }  

    angular
        .module('app.api')
        .service('apiConfigService', ApiConfigService);
}

