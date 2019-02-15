import { take } from 'rxjs/operators';

import { StateContainer } from './state-container';

export const getSnapshot = async (container: StateContainer<any>) =>
  await container.value.pipe(take(1)).toPromise();
