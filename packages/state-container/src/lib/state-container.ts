import { Observable, Subject } from 'rxjs';
import { scan, concatMapTo, take } from 'rxjs/operators';

import { AsyncDispatcher, DispatchChange } from './async-dispatcher';
import { Action, Reducer } from './tokens';
import { AsyncState } from './async-state';

export class StateContainer<T, A extends Action = Action> extends AsyncState<T> {
  private readonly asyncDispatcher = new AsyncDispatcher<A>(action => {
    this.actions.next(action as A);
  });

  public readonly actionStream = this.actions.asObservable();

  constructor(
    reducer: Reducer<T, A>,
    initValue: T,
    private readonly actions: Subject<A> = new Subject<A>()
  ) {
    super(initValue);

    this.actions.pipe(scan(reducer, initValue)).subscribe(state => {
      this.setState(() => state);
    });
  }

  update(change: DispatchChange<A>): Observable<T> {
    return this.asyncDispatcher.dispatch(change).pipe(
      concatMapTo(this.value),
      take(1)
    );
  }
}
