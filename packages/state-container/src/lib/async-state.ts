import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, distinctUntilChanged } from 'rxjs/operators';

import { StateResult } from './tokens';
import { toObservable } from './util';

export class AsyncState<T> {
  private readonly stateManager: BehaviorSubject<T> = new BehaviorSubject<T>(this.initValue);

  public readonly value: Observable<T> = this.stateManager.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  constructor(private initValue: T) {}

  reset(): void {
    this.setState(() => this.initValue);
  }

  setState(result: () => StateResult<T>): Observable<T> {
    const res = toObservable(result()).pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

    res.subscribe(state => {
      this.stateManager.next(state);
    });

    return res;
  }
}
