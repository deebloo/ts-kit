# AsyncState

Sometimes all you need is a bucket to put state in with no need to dispatching to reacting to actions.
With AsyncState you can create your own bucket with no action fluff.

```TS
import { AsyncState } from '@ts-kit/state-container';
import { of } from 'rxjs';

const state = new AsyncState<counter>(0);

state.setState(1);
state.setState(() => 1);

// or a promise

state.setState(Promise.resolve(1))
state.setState(() => Promise.resolve(1))

// or an observable

state.setState(of(1))
state.setState(() => of(1))
```
