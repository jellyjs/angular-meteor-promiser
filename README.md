# angular-meteor-promiser
Turns Meteor subscribe, call, apply callbacks into promises

## Install

```bash
npm install angular-meteor-promiser
```


### `$promiser`

#### subscribe

Same arguments as `Meteor.subscribe` but without callback.

`resolve()` receives a handle that provides `stop()` and `ready()` methods.

#### call

Same arguments as `Meteor.call`.

#### apply=

Same arguments as `Meteor.apply`.

#### any *(sync and async)*

```js
function foo(bar) {
  if (!bar) {
    throw new Error('Bar, we need you!');
  }

  return bar;
}

$promiser.any(() => foo('sync'))
  .then((data) => { ... }) // 'sync'
  .catch((error) => { ... });

$promiser.any((done) => {
  setTimeout(() => {
    done(foo('async'))
  }, 500);
})
  .then((data) => { ... }) // 'async'
  .catch((error) => { ... });
```
