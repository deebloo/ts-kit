# StateContainer: Devtools

https://github.com/zalmoxisus/redux-devtools-extension

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
