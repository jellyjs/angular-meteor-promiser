# angular-meteor-promiser
Turns Meteor subscribe, call, apply callbacks into promises

## Install

```bash
npm install angular-meteor-promiser
```

### $promiser

#### subscribe : *Promise*

Same arguments as `Meteor.subscribe` but without callback. 

`resolve()` receives a handle that provides `stop()` and `ready()` methods.

#### call : *Promise*

Same arguments as `Meteor.call`

#### apply : *Promise*

Same arguments as `Meteor.apply

#### any : *Promise* `not yet!`

```js

function foo(bar) {
  if (!bar) {
    throw new Error('Bar, we need you!');
  }
  
  return bar;
}

$promiser.any(() => foo('bar'))
  .then((data) => { ... })
  .catch((error) => { ... });
```
