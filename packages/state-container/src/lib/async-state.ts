import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, distinctUntilChanged } from 'rxjs/operators';

import { StateResult } from './tokens';
import { toObservable, StateCtx } from './util';

export type DispatchResult<T = any> = ((state: StateCtx<T>) => StateResult<T>) | StateResult<T>;

export class AsyncState<T> {
  private readonly stateManager: BehaviorSubject<T> = new BehaviorSubject<T>(this.initValue);
  private readonly stateCtx: StateCtx<T> = new StateCtx<T>(() => this.stateManager.getValue());

  public readonly value: Observable<T> = this.stateManager.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay(1)
  );

  public get snapshot() {
    return this.stateManager.getValue();
  }

  constructor(private initValue: T) {}

  reset(): Observable<T> {
    return this.setState(() => this.initValue);
  }

  setState(change: DispatchResult<T>): Observable<T> {
    const src = change instanceof Function ? change(this.stateCtx) : change;
    const res = toObservable(src).pipe(shareReplay(1));

    res.subscribe(state => {
      this.stateManager.next(state);
    });

    return res;
  }
}
