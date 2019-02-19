import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Action, StateChange } from './tokens';
import { toObservable } from './util';

export type DispatchChange<T = any> = (() => StateChange<T>) | StateChange<T>;

export class AsyncDispatcher<A extends Action = Action> {
  constructor(private dispatcher: (action: Action<any>) => void) {}

  dispatch(change: DispatchChange<A>): Observable<A | A[]> {
    const src = change instanceof Function ? change() : change;
    const result = toObservable(src).pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

    result.subscribe(actions => {
      if (Array.isArray(actions)) {
        actions.forEach(this.dispatcher);
      } else {
        this.dispatcher(actions);
      }
    });

    return result;
  }
}
