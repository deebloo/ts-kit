import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { shareReplay, distinctUntilChanged, scan, concatMapTo, take } from 'rxjs/operators';

import { Action, StateChange } from './tokens';
import { AsyncDispatcher } from './async-dispatcher';

export class StateContainer<T, A extends Action = Action> {
  private readonly stateManager: BehaviorSubject<T> = new BehaviorSubject<T>(this.initValue);
  private readonly asyncDispatcher = new AsyncDispatcher<A>(action => {
    this.actions.next(action as A);
  });

  public readonly value: Observable<T> = this.stateManager.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(
    private reducer: (s: T, action: A) => T,
    private initValue: T,
    private actions: Subject<A> = new Subject<A>()
  ) {
    this.actions.pipe(scan(this.reducer, this.initValue)).subscribe(state => {
      this.stateManager.next(state);
    });
  }

  update(change: (() => StateChange<A>) | StateChange<A>): Observable<T> {
    return this.asyncDispatcher.dispatch(change).pipe(
      concatMapTo(this.value),
      take(1)
    );
  }
}
