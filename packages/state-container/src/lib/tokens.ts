import { Observable } from 'rxjs';

export interface Action<T = any, P = any> {
  type: T;
  payload?: P;
}

export type StateChange<A = Action> = A | A[] | Observable<A | A[]> | Promise<A | A[]>;
