# StateContainer

An idea for dispatching actions in an asynchronous manner. (Similar to Thunk)

#### Installation:

```BASH
npm i @ts-kit/state-container
```

##### A state container is created by defining an initial state and a reducer

```TS
import { StateContainer, Action } from '@ts-kit/state-container';

const enum CounterTodoType { Increment, Decrement }

class Increment implements Action {
  readonly type = CounterTodoType.Increment
}

class Decrement implements Action {
  readonly type = CounterTodoType.Decrement
}

const container = new StateContainer((state: number, action: Increment | Decrement): number => {
  switch(action.type) {
    case CounterTodoType.Increment:
      return state + 1;

    case CounterTodoType.Decrement:
      return state - 1;
  }
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
container.update(() => new Increment());
```

```TS
// A Promise that resolves to an action

container.update(fetch('/my-api').then(() => new Increment()));
container.update(() => fetch('/my-api').then(() => new Increment()));
```

```TS
// An Observable that resolves to an action

container.update(of('Hello').pipe(map(() => new Increment())));
container.update(() => of('Hello').pipe(map(() => new Increment())));
```

## Want to use this with NgRx, NGXS or another state management solution?

GO FOR IT! This package exposes a class called AsyncDispatcher which StateContainer uses internally.
Use it to create your own state containers.

```TS
import { AsyncDispatcher } from '@ts-kit/state-container';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class NgrxStateContainer {
  private readonly asyncDispatcher = new AsyncDispatcher(
    action => this.store.dispatch(action)
  );

  constructor(public value: Store<any>) {}

  update(change: (() => StateChange) | StateChange): Observable<any> {
    return this.asyncDispatcher.dispatch(change).pipe(
      concatMapTo(this.value),
      take(1)
    );
  }
}
```
