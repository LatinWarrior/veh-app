/// <reference path="../../../../typings/index.d.ts" />
"use strict";
// usage: <things></things>
var app;
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
