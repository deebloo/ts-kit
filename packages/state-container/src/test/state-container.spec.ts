import { StateContainer, Action } from '@ts-kit/state-container';
import { take, skip } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

describe('State', () => {
  it('should update when an action is passed directly to update', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    class Decrement implements Action {
      type: 'DECREMENT' = 'DECREMENT';
    }

    const manager = new StateContainer<number, Increment | Decrement>(0, (state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;

        case 'DECREMENT':
          return state - 1;
      }

      return state;
    });

    manager.update(new Increment());
    manager.update(new Increment());
    manager.update(new Decrement());

    expect(await manager.value.pipe(take(1)).toPromise()).toBe(1);
  });

  it('should update when the state function returns an action', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    class Decrement implements Action {
      type: 'DECREMENT' = 'DECREMENT';
    }

    const manager = new StateContainer<number, Increment | Decrement>(0, (state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;

        case 'DECREMENT':
          return state - 1;
      }

      return state;
    });

    manager.update(() => new Increment());
    manager.update(() => new Increment());
    manager.update(() => new Decrement());

    expect(await manager.value.pipe(take(1)).toPromise()).toBe(1);
  });

  it('should update when the state function returns a Promise', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    const manager = new StateContainer(0, (state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
      }

      return state;
    });

    manager.update(
      () =>
        new Promise(resolve => {
          resolve(new Increment());
        })
    );

    expect(
      await manager.value
        .pipe(
          skip(1),
          take(1)
        )
        .toPromise()
    ).toBe(1);
  });

  it('should update when the state function returns an Observable', async () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    const manager = new StateContainer(0, (state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
      }

      return state;
    });
    manager.update(
      () =>
        new Observable(subscriber => {
          subscriber.next(new Increment());
        })
    );

    expect(await manager.value.pipe(take(1)).toPromise()).toBe(1);
  });

  it('should only fire once when subscribed to', () => {
    class Increment implements Action {
      type: 'INCREMENT' = 'INCREMENT';
    }

    const manager = new StateContainer(0, (state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
      }

      return state;
    });

    let callCount = 0;

    manager
      .update(
        () =>
          new Observable(subscriber => {
            callCount++;

            subscriber.next(new Increment());
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
      0,
      (state, action) => {
        switch (action.type) {
          case 'INCREMENT':
            return state + 1;
        }

        return state;
      },
      dispatcher
    );

    manager.update(() => new Increment());
    manager.update(() => new Increment());
    manager.update(() => new Increment());

    expect(dispatchesFromLocalDispatcher).toBe(3);
  });
});
