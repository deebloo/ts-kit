import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Action, StateChange } from './tokens';
import { toObservable } from './util';

export type DispatchChange<T = any> = (() => StateChange<T>) | StateChange<T>;

export class AsyncDispatcher<A extends Action = Action> {
  private readonly actionSrc = new Subject<A>();

  public readonly actionStream: Observable<A> = this.actionSrc.asObservable();

  dispatch(change: DispatchChange<A>): Observable<A | A[]> {
    const src = change instanceof Function ? change() : change;
    const result = toObservable(src).pipe(shareReplay({ bufferSize: 1, refCount: true }));

    result.subscribe(actions => {
      if (Array.isArray(actions)) {
        actions.forEach(action => this.actionSrc.next(action));
      } else {
        this.actionSrc.next(actions);
      }
    });

    return result;
  }
}
