# AsyncDispatcher

The async dispatcher allows you to just have the ability to resolve actions in an async fashion.
Below is an example or using a custom instance of AsyncDispatcher to interact with NgRx.

```TS
import { AsyncDispatcher, DispatchChange } from '@ts-kit/state-container';
import { Store, Action } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class NgrxStateContainer {
  private readonly dispatcher = new AsyncDispatcher<Action>();

  constructor(public value: Store<any>) {
    this.dispatcher.actionStream.subscribe(action => {
      // AsyncDispatcher always results to a stream of individual actions that can be piped somewhere
      this.store.dispatch(action);
    });
  }

  update(change: DispatchChange): Observable<any> {
    return this.dispatcher.dispatch(change).pipe(
      concatMapTo(this.value),
      take(1)
    );
  }
}
```
