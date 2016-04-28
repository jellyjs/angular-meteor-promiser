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
      console.log('sub');
      const handle = Meteor.subscribe(name, ...args, {
        onReady() {
          console.log('onready');
          resolve(handle);
        },
        onStop() {
          console.log('onstop')
          reject();
        },
        onError() {
          console.log('onerror');
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

  private _promise(fn) {
    const d = this.$q.defer();

    fn(d.resolve, d.reject);

    return d.promise;
  }
}

const name = 'angular-meteor.promiser';
export default name;

angular
  .module(name, [])
  .service('$promiser', ['$q', Promiser]);
