var app;
(function (app) {
    'use strict';
    angular
        .module('app', [
        'app.demo',
        'app.galaxy',
        'app.templates',
        'ui.router',
        'app.vehicle'
    ])
        .config(function ($stateProvider, $urlRouterProvider) {
        var helloState = {
            name: 'home',
            url: '/home',
            templateUrl: 'src/home/home.html'
        };
        var aboutState = {
            name: 'about',
            url: '/about',
            templateUrl: 'src/home/about.html'
        };
        var helloGalaxyState = {
            name: 'hello-galaxy',
            url: '/hello-galaxy',
            template: '<hello-galaxy></hello-galaxy>'
        };
        var demoState = {
            name: 'demo',
            url: '/demo',
            templateUrl: 'src/demo/demo.html'
        };
        var vehicleListState = {
            name: 'vehicle-list',
            url: '/vehicles',
            template: '<vehicle-list></vehicle-list>'
        };
        var thingsState = {
            name: 'things',
            url: '/things',
            template: '<things></things>'
        };
        $stateProvider.state(helloState);
        $stateProvider.state(aboutState);
        $stateProvider.state(helloGalaxyState);
        $stateProvider.state(demoState);
        $stateProvider.state(vehicleListState);
        $stateProvider.state(thingsState);
        $urlRouterProvider.otherwise('/');
    });
})(app || (app = {}));
var app;
(function (app) {
    var galaxy;
    (function (galaxy) {
        'use strict';
        angular
            .module('app.galaxy')
            .component('helloGalaxy', {
            bindings: {},
            templateUrl: 'src/app/components/hello-galaxy.component.html',
            controller: function () {
                this.greeting = 'hello';
                this.toggleGreeting = function () {
                    this.greeting = (this.greeting === 'hello') ? 'what\'s up' : 'hello';
                };
            }
        });
    })(galaxy = app.galaxy || (app.galaxy = {}));
})(app || (app = {}));
angular.module('app.galaxy', []);
angular.module('app.demo', []);
var app;
(function (app) {
    var demo;
    (function (demo) {
        'use strict';
        var DemoCtrl = (function () {
            function DemoCtrl($scope) {
                this.$scope = $scope;
            }
            return DemoCtrl;
        }());
        demo.DemoCtrl = DemoCtrl;
        var DemoService = (function () {
            function DemoService() {
                this.getExcited = false;
            }
            return DemoService;
        }());
        demo.DemoService = DemoService;
        angular
            .module('app.demo')
            .directive("demo", function () {
            return {
                templateUrl: 'src/app/demo/demo.html',
                controller: DemoCtrl,
                controllerAs: 'demoCtrlVM'
            };
        })
            .controller("demoCtrl", DemoCtrl)
            .factory("demoService", [function () { return new app.demo.DemoService(); }]);
    })(demo = app.demo || (app.demo = {}));
})(app || (app = {}));
System.register("entities/company", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Company;
    return {
        setters:[],
        execute: function() {
            Company = (function () {
                function Company(id, name) {
                    this.id = id;
                    this.name = name;
                }
                return Company;
            }());
            exports_1("Company", Company);
        }
    }
});
System.register("entities/model-year", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var ModelYear;
    return {
        setters:[],
        execute: function() {
            ModelYear = (function () {
                function ModelYear(id, year) {
                    this.id = id;
                    this.year = year;
                }
                return ModelYear;
            }());
            exports_2("default", ModelYear);
        }
    }
});
System.register("entities/vehicle-model", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var VehicleModel;
    return {
        setters:[],
        execute: function() {
            VehicleModel = (function () {
                function VehicleModel(id, name, niceName, years) {
                    this.id = id;
                    this.name = name;
                    this.niceName = niceName;
                    this.years = years;
                }
                return VehicleModel;
            }());
            exports_3("default", VehicleModel);
        }
    }
});
System.register("entities/vehicle", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Vehicle;
    return {
        setters:[],
        execute: function() {
            Vehicle = (function () {
                function Vehicle(id, name, niceName, models) {
                    this.id = id;
                    this.name = name;
                    this.niceName = niceName;
                    this.models = models;
                }
                return Vehicle;
            }());
            exports_4("default", Vehicle);
        }
    }
});
angular
    .module('app.service', []);
System.register("services/data-access.service", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var DataAccessService;
    return {
        setters:[],
        execute: function() {
            DataAccessService = (function () {
                function DataAccessService($http) {
                    var _this = this;
                    this.$http = $http;
                    this.vehiclesUrl = '.././data/makes.json';
                    this.getVehicles = function () {
                        return _this
                            .$http
                            .$get(_this.vehiclesUrl)
                            .then(function (response) {
                            var vehicles = response.json().data;
                            console.log("In getVehicles of data-access.services. vehicles: " + vehicles);
                            return vehicles;
                        });
                    };
                    console.log("In constructor of data-access.services");
                }
                DataAccessService.vehicleService = function ($http) {
                    console.log("In static vehicleService method of data-access.services");
                    return new DataAccessService($http);
                };
                return DataAccessService;
            }());
            exports_5("DataAccessService", DataAccessService);
            DataAccessService.vehicleService.$inject = ['$http'];
            angular
                .module('app.service')
                .service('dataAccessService', function () { return DataAccessService.vehicleService; });
        }
    }
});
System.register("things/things.component", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var app;
    return {
        setters:[],
        execute: function() {
            (function (app) {
                var things;
                (function (things) {
                    var Things = (function () {
                        function Things($q) {
                            var _this = this;
                            this.$q = $q;
                            this.getCompanies = function () {
                                return _this.$q.when(_this.companies);
                            };
                            this.companies = [
                                {
                                    "id": 1,
                                    "name": "Company 1"
                                }, {
                                    "id": 2,
                                    "name": "Company 2"
                                }
                            ];
                        }
                        Things.$inject = ['$q'];
                        return Things;
                    }());
                    things.Things = Things;
                })(things = app.things || (app.things = {}));
            })(app || (app = {}));
        }
    }
});
System.register("vehicles/vehicle-list.component", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var app;
    return {
        setters:[],
        execute: function() {
            (function (app) {
                var vehicle;
                (function (vehicle) {
                    'use strict';
                    var VehicleListController = (function () {
                        function VehicleListController(dataAccessService) {
                            var _this = this;
                            this.dataAccessService = dataAccessService;
                            this.$onInit = function () {
                                console.log('In $onInit of VehicleListController');
                                _this
                                    .dataAccessService
                                    .getVehicles()
                                    .then(function (vehicles) {
                                    console.log("In $onInit. vehicles: " + vehicles);
                                    _this.vehicles = vehicles;
                                });
                            };
                            this.$onChanges = function (changes) {
                                console.log("In $onChanges. changes: " + changes);
                            };
                            console.log('In constructor of VehicleListController');
                        }
                        VehicleListController.$inject = ['dataAccessService', '$http'];
                        return VehicleListController;
                    }());
                    var VehicleListComponent = (function () {
                        function VehicleListComponent() {
                            console.log("In constructor of VehicleListComponent");
                            this.bindings = {};
                            this.controller = VehicleListController;
                            this.templateUrl = 'src/app/vehicles/vehicle-list.component.html';
                        }
                        return VehicleListComponent;
                    }());
                    vehicle.VehicleListComponent = VehicleListComponent;
                    angular
                        .module('app.vehicle')
                        .component('vehicleList', [function () { return new VehicleListComponent(); }]);
                })(vehicle = app.vehicle || (app.vehicle = {}));
            })(app || (app = {}));
        }
    }
});
System.register("vehicles/vehicle.component", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var VehicleController, VehicleComponent;
    return {
        setters:[],
        execute: function() {
            VehicleController = (function () {
                function VehicleController(vehicle) {
                    this.vehicle = vehicle;
                    console.log('In constructor of VehicleController');
                }
                return VehicleController;
            }());
            VehicleComponent = (function () {
                function VehicleComponent() {
                    console.log('In constructor of VehicleComponent');
                    this.bindings = {};
                    this.controller = VehicleController;
                    this.templateUrl = 'src/app/vehicles/vehicle.component.html';
                }
                return VehicleComponent;
            }());
            exports_8("VehicleComponent", VehicleComponent);
            angular
                .module('app.vehicle')
                .component('vehicle', function () { return new VehicleComponent(); });
        }
    }
});
angular.module('app.vehicle', ['app.service']);
//# sourceMappingURL=app.js.map