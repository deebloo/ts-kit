# StateContainer [![CircleCI](https://circleci.com/gh/deebloo/state-container.svg?style=svg)](https://circleci.com/gh/deebloo/state-container)

### A state container is created by defining an initial state and a reducer

```TS
import { StateContainer, Action } from '@deebloo/state-container';

const enum CounterTodoType { Increment, Decrement }

class Increment implements Action<CounterTodoType> {
  readonly type = CounterTodoType.Increment;
}

class Decrement implements Action<CounterTodoType> {
  readonly type = CounterTodoType.Decrement;
}

const container = new StateContainer<number, Increment | Decrement>(0, (state, action) => {
  switch(action.type) {
    case CounterTodoType.Increment:
      return state + 1;

    case CounterTodoType.Increment:
      return state + 1;
  }

  return state;
});
```

### Get state by subscribing to the value

```TS
// A raw action
container.value.subscribe(console.log);
```

### Update State by passing it a StateResult which is either:

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
