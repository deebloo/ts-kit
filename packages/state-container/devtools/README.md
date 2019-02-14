# StateContainer

An idea for dispatching actions in an asynchronous manner. (Similar to Thunk)

#### Installation:

```BASH
npm i @ts-kit/state-container
```

##### A state container is created by defining an initial state and a reducer

```TS
import { connectDevtools } from '@ts-kit/state-container/devtools';

const state = new StateContainer(...);

connectDevTools(state);
```
