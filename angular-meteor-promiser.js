"use strict";
var angular = require('angular');
var meteor_1 = require('meteor/meteor');
var Promiser = (function () {
    function Promiser($q) {
        this.$q = $q;
    }
    Promiser.prototype.subscribe = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this._promise(function (resolve, reject) {
            console.log('sub');
            var handle = meteor_1.Meteor.subscribe.apply(meteor_1.Meteor, [name].concat(args, [{
                onReady: function () {
                    console.log('onready');
                    resolve(handle);
                },
                onStop: function () {
                    console.log('onstop');
                    reject();
                },
                onError: function () {
                    console.log('onerror');
                }
            }]));
        });
    };
    Promiser.prototype.call = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this._promise(function (resolve, reject) {
            meteor_1.Meteor.call.apply(meteor_1.Meteor, [name].concat(args, [function (error, data) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            }]));
        });
    };
    Promiser.prototype.apply = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this._promise(function (resolve, reject) {
            meteor_1.Meteor.apply.apply(meteor_1.Meteor, [name].concat(args, [function (error, data) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            }]));
        });
    };
    Promiser.prototype._promise = function (fn) {
        var d = this.$q.defer();
        fn(d.resolve, d.reject);
        return d.promise;
    };
    return Promiser;
}());
var name = 'angular-meteor.promiser';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = name;
angular
    .module(name, [])
    .service('$promiser', ['$q', Promiser]);
//# sourceMappingURL=angular-meteor-promiser.js.map