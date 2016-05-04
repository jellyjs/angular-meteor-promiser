import * as angular from 'angular';

import {
  Meteor
} from 'meteor/meteor';

class Promiser {
  public $q: any;

  constructor($q: any) {
    this.$q = $q;
  }

  public subscribe(name, ...args) {
    return this._promise((resolve, reject) => {
      const handle = Meteor.subscribe(name, ...args, {
        onReady() {
          resolve(handle);
        },
        onStop(error) {
          reject(error);
        }
      });
    });
  }

  public call(name, ...args) {
    return this._promise((resolve, reject) => {
      Meteor.call(name, ...args, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public apply(name, ...args) {
    return this._promise((resolve, reject) => {
      Meteor.apply(name, ...args, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public any(fn) {
    return this._promise((resolve, reject) => {
      try {
        const result = fn(resolve, reject);

        if (typeof result !== 'undefined') {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  private _promise(fn) {
    return this.$q(fn);
  }
}

const name = 'angular-meteor-promiser';
export default name;

angular
  .module(name, [])
  .service('$promiser', ['$q', Promiser]);
