import { Observable } from 'rxjs';

export interface Action<T = any> {
  type: T;
  payload?: any;
}

export type StateChange<A = Action> = A | Observable<A> | Promise<A>;
