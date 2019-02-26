import { Observable } from 'rxjs';
import { scan, concatMapTo, take } from 'rxjs/operators';

import { AsyncDispatcher, DispatchChange } from './async-dispatcher';
import { Action, Reducer } from './tokens';
import { AsyncState } from './async-state';

export class StateContainer<T, A extends Action = Action> extends AsyncState<T> {
  public readonly actionStream: Observable<A> = this.asyncDispatcher.actionStream;

  constructor(
    reducer: Reducer<T, A>,
    initValue: T,
    private asyncDispatcher = new AsyncDispatcher<A>()
  ) {
    super(initValue);

    this.actionStream.pipe(scan(reducer, initValue)).subscribe(state => {
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
