import { Observable, isObservable, from, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Action, StateChange } from './tokens';

export const stateResultToObservable = <A>(result: StateChange<A>): Observable<A> => {
  if (isObservable(result)) {
    return result;
  } else if (result instanceof Promise) {
    return from(result);
  }

  return of(result);
};

export class AsyncDispatcher<A extends Action = Action> {
  constructor(private dispatcher: (action: Action<any>) => void) {}

  dispatch(change: (() => StateChange<A>) | StateChange<A>): Observable<A> {
    const result: Observable<A> = stateResultToObservable(
      change instanceof Function ? change() : change
    ).pipe(shareReplay(1));

    result.subscribe((action: A) => {
      this.dispatcher(action);
    });

    return result;
  }
}
