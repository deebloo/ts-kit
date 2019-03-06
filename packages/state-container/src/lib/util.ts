import { Observable, isObservable, from, of } from 'rxjs';
import { take, map, distinctUntilChanged } from 'rxjs/operators';

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

export class StateCtx<T> {
  constructor(public getState: () => T) {}
}

export const select = <S, R>(fn: (state: S) => R) => (observable: Observable<S>) => {
  return observable.pipe(
    map(fn),
    distinctUntilChanged()
  );
};

export const selectOnce = <S, R>(fn: (state: S) => R) => (observable: Observable<S>) => {
  return observable.pipe(
    map(fn),
    take(1)
  );
};
