# StateContainer

An idea for dispatching actions in an asynchronous manner. (Similar to Thunk)
#### Installation:

```BASH
npm i @ts-kit/state-container
```

#### Example:

##### A state container is created by defining an initial state and a reducer

```TS
import { StateContainer, Action } from '@ts-kit/state-container';

const enum CounterTodoType { Increment, Decrement }

class Increment implements Action<CounterTodoType> {
  readonly type = CouterTodoType.Increment
}

const container = new StateContainer((state, action) => {
  switch(action.type) {
    case CounterTodoType.Increment:
      return state + 1;

    case CounterTodoType.Decrement:
      return state - 1;
  }

  return state;
}, 0);
```

##### Get state by subscribing to the value

```TS
// A raw action
container.value.subscribe(console.log);
```

##### Update State by passing it a StateChange which is either:

```TS
// A raw action
container.update(new Increment());
```

```TS
// A function that returns an action
container.update(() => new Increment());
```

```TS
// A function that returns a promise that resolves to an action
container.update(() => fetch('/my-api').then(() => new Increment()));
```

```TS
// A function that returns an Observable that resolves to an action
container.update(() => of('Hello').pipe(map(() => new Increment())));
```
