import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { shareReplay, distinctUntilChanged, scan } from 'rxjs/operators';

import { Action } from './tokens';
import { AsyncDispatcher } from './async-dispatcher';

export class StateContainer<T, A extends Action = Action> extends AsyncDispatcher<A> {
  private readonly stateManager: BehaviorSubject<T> = new BehaviorSubject<T>(this.initValue);

  public readonly value: Observable<T> = this.stateManager.pipe(
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(
    reducer: (s: T, action: A) => T,
    private initValue: T,
    dispatcher: Subject<A> = new Subject<A>()
  ) {
    super(action => dispatcher.next(action as A));

    dispatcher.pipe(scan(reducer, initValue)).subscribe(state => {
      this.stateManager.next(state);
    });
  }
}
