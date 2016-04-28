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
            var handle = meteor_1.Meteor.subscribe.apply(meteor_1.Meteor, [name].concat(args, [{
                onReady: function () {
                    resolve(handle);
                },
                onStop: function () {
                    reject();
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
    Promiser.prototype.any = function (fn) {
        return this._promise(function (resolve, reject) {
            try {
                var result = fn(resolve);
                if (typeof result !== 'undefined') {
                    resolve(result);
                }
            }
            catch (error) {
                reject(error);
            }
        });
    };
    Promiser.prototype._promise = function (fn) {
        return this.$q(fn);
    };
    return Promiser;
}());
var name = 'angular-meteor-promiser';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = name;
angular
    .module(name, [])
    .service('$promiser', ['$q', Promiser]);
//# sourceMappingURL=angular-meteor-promiser.js.map