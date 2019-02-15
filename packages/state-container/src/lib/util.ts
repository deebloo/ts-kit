import { take } from 'rxjs/operators';

import { StateContainer } from './state-container';

export const getSnapshot = <T>(container: StateContainer<T>) =>
  container.value.pipe(take(1)).toPromise();
