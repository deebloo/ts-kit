import { Observable, isObservable, from, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { StateContainer } from './state-container';

export const getSnapshot = <T>(container: StateContainer<T>) =>
  container.value.pipe(take(1)).toPromise();

export const toObservable = <T>(result: T | Promise<T> | Observable<T>): Observable<T> => {
  if (isObservable(result)) {
    return result;
  } else if (result instanceof Promise) {
    return from(result);
  }

  return of(result);
};
