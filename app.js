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
angular.module('app.galaxy', []);
var app;
(function (app) {
    var galaxy;
    (function (galaxy) {
        'use strict';
        angular
            .module('app.galaxy')
            .component('helloGalaxy', {
            bindings: {},
            templateUrl: 'src/components/hello-galaxy.component.html',
            controller: function () {
                this.greeting = 'hello';
                this.toggleGreeting = function () {
                    this.greeting = (this.greeting === 'hello') ? 'what\'s up' : 'hello';
                };
            }
        });
    })(galaxy = app.galaxy || (app.galaxy = {}));
})(app || (app = {}));
angular
    .module('app.demo', []);
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
                templateUrl: 'app-templates/demo/demo.html',
                controller: DemoCtrl,
                controllerAs: 'demoCtrlVM'
            };
        })
            .controller("demoCtrl", DemoCtrl)
            .factory("demoService", [function () { return new app.demo.DemoService(); }]);
    })(demo = app.demo || (app.demo = {}));
})(app || (app = {}));
angular
    .module('app.service', []);
angular.module('app.vehicle', ['app.service']);
//# sourceMappingURL=app.js.map