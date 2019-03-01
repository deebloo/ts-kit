import { Observable } from 'rxjs';

/**
 * @param type - the unique identifier for the action
 * @param payload - (OPTIONAL) the content of the action
 * @param source - (OPTIONAL) a marker showing WHERE the action originated
 */
export interface Action<T = any, P = any> {
  type: T;
  payload?: P;
  source?: string;
}
export type StateChange<A = Action> = A | A[] | Observable<A | A[]> | Promise<A | A[]>;
export type StateResult<T> = T | Observable<T> | Promise<T>;
export type Reducer<T, A> = (s: T, action: A) => T;
