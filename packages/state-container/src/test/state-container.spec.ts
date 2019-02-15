import { StateContainer, Action } from '@ts-kit/state-container';
import { take, switchMapTo } from 'rxjs/operators';
import { Observable, Subject, of, forkJoin } from 'rxjs';
import { getSnapshot } from '../lib/util';

describe('StateContainer', () => {
  it('should update when an action is passed directly to update', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    class Decrement implements Action {
      type: 'DECREMENT' = 'DECREMENT';
    }

    const manager = new StateContainer<number, Increment | Decrement>((state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;

        case 'DECREMENT':
          return state - 1;
      }
    }, 0);

    const value = await forkJoin(
      manager.update(new Increment()),
      manager.update(new Increment()),
      manager.update(new Decrement())
    )
      .pipe(
        switchMapTo(manager.value),
        take(1)
      )
      .toPromise();

    expect(value).toBe(1);
  });

  it('should update when a Promise resolving to an action is passed directly to update', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    class Decrement implements Action {
      type: 'DECREMENT' = 'DECREMENT';
    }

    const manager = new StateContainer<number, Increment | Decrement>((state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;

        case 'DECREMENT':
          return state - 1;
      }
    }, 0);

    const value = await forkJoin(
      manager.update(Promise.resolve(new Increment())),
      manager.update(Promise.resolve(new Increment())),
      manager.update(Promise.resolve(new Decrement()))
    )
      .pipe(
        switchMapTo(manager.value),
        take(1)
      )
      .toPromise();

    expect(value).toBe(1);
  });

  it('should update when an Observable resolving to an action is passed directly to update', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    class Decrement implements Action {
      type: 'DECREMENT' = 'DECREMENT';
    }

    const manager = new StateContainer<number, Increment | Decrement>((state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;

        case 'DECREMENT':
          return state - 1;
      }
    }, 0);

    const value = await forkJoin(
      manager.update(of(new Increment())),
      manager.update(of(new Increment())),
      manager.update(of(new Decrement()))
    )
      .pipe(
        switchMapTo(manager.value),
        take(1)
      )
      .toPromise();

    expect(value).toBe(1);
  });

  it('should update when the state function returns an action', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    class Decrement implements Action {
      type: 'DECREMENT' = 'DECREMENT';
    }

    const manager = new StateContainer<number, Increment | Decrement>((state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;

        case 'DECREMENT':
          return state - 1;
      }
    }, 0);

    const value = await forkJoin(
      manager.update(() => new Increment()),
      manager.update(() => new Increment()),
      manager.update(() => new Decrement())
    )
      .pipe(
        switchMapTo(manager.value),
        take(1)
      )
      .toPromise();

    expect(value).toBe(1);
  });

  it('should update when the state function returns a Promise', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    const manager = new StateContainer<number, Increment>((state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
      }
    }, 0);

    const value = await manager
      .update(() => Promise.resolve(new Increment()))
      .pipe(
        switchMapTo(manager.value),
        take(1)
      )
      .toPromise();

    expect(value).toBe(1);
  });

  it('should update when the state function returns an Observable', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    const manager = new StateContainer<number, Increment>((state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
      }
    }, 0);

    const value = await manager
      .update(() => of(new Increment()))
      .pipe(
        switchMapTo(manager.value),
        take(1)
      )
      .toPromise();

    expect(value).toBe(1);
  });

  it('should only fire once when subscribed to', () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    const manager = new StateContainer<number, Increment>((state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
      }
    }, 0);

    let callCount = 0;

    manager
      .update(
        () =>
          new Observable(subscriber => {
            callCount++;

            subscriber.next(new Increment());
            subscriber.complete();
          })
      )
      .subscribe();

    expect(callCount).toBe(1);
  });

  it('should correctly use a provided dispatcher', () => {
    let dispatchesFromLocalDispatcher = 0;

    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    const dispatcher = new Subject<Increment>();

    dispatcher.subscribe(() => {
      dispatchesFromLocalDispatcher++;
    });

    const manager = new StateContainer<number, Increment>(
      (state, action) => {
        switch (action.type) {
          case 'INCREMENT':
            return state + 1;
        }
      },
      0,
      dispatcher
    );

    manager.update(new Increment());
    manager.update(new Increment());
    manager.update(new Increment());

    expect(dispatchesFromLocalDispatcher).toBe(3);
  });

  it('should update when dispatching multiple actions', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    const manager = new StateContainer<number, Increment>((state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
      }
    }, 0);

    const value = await manager
      .update([new Increment(), new Increment(), new Increment(), new Increment()])
      .pipe(
        switchMapTo(manager.value),
        take(1)
      )
      .toPromise();

    expect(value).toBe(4);
  });

  it('should update when dispatching an Observable that resolves to multiple actions', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    const manager = new StateContainer<number, Increment>((state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
      }
    }, 0);

    const value = await manager
      .update(of([new Increment(), new Increment(), new Increment(), new Increment()]))
      .pipe(
        switchMapTo(manager.value),
        take(1)
      )
      .toPromise();

    expect(value).toBe(4);
  });

  it('should update when dispatching a Promise that resolves to multiple actions', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    const manager = new StateContainer<number, Increment>((state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
      }
    }, 0);

    const value = await manager
      .update(Promise.resolve([new Increment(), new Increment(), new Increment(), new Increment()]))
      .pipe(
        switchMapTo(manager.value),
        take(1)
      )
      .toPromise();

    expect(value).toBe(4);
  });

  it('should reset the state container to the initial state', async () => {
    const manager = new StateContainer<number>(state => state, 0);

    manager.setState(() => 100);

    expect(await getSnapshot(manager)).toBe(100);

    manager.reset();

    expect(await getSnapshot(manager)).toBe(0);
  });
});
