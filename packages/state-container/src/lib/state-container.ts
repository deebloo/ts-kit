import { BehaviorSubject, Observable, isObservable, of, from, Subject } from 'rxjs';
import { shareReplay, distinctUntilChanged, scan, take, concatMapTo } from 'rxjs/operators';

export interface Action<T = string | number> {
  type: T;
  payload?: any;
}

export type StateChange<A = Action> = A | Observable<A> | Promise<A>;

const stateResultToObservable = <A>(result: StateChange<A>): Observable<A> => {
  if (isObservable(result)) {
    return result;
  } else if (result instanceof Promise) {
    return from(result);
  }

  return of(result);
};

export class StateContainer<T, A extends Action = Action> {
  private readonly stateManager: BehaviorSubject<T> = new BehaviorSubject<T>(this.initValue);

  readonly value: Observable<T> = this.stateManager.pipe(
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(
    reducer: (s: T, action: A) => T,
    private initValue: T,
    private dispatcher: Subject<A> = new Subject<A>()
  ) {
    this.dispatcher.pipe(scan<A, T>(reducer, initValue)).subscribe((state: T) => {
      this.stateManager.next(state);
    });
  }

  update(change: (() => StateChange<A>) | StateChange<A>): Observable<T> {
    const result: Observable<A> = stateResultToObservable(
      change instanceof Function ? change() : change
    ).pipe(shareReplay(1));

    result.subscribe((action: A) => {
      this.dispatcher.next(action);
    });

    return result.pipe(
      concatMapTo(this.value),
      take(1)
    );
  }
}
