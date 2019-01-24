import { Observable, Subject } from 'rxjs';
export interface Action<T = string | number> {
    type: T;
    payload?: any;
}
export declare type StateResult<A = Action> = A | Observable<A> | Promise<A>;
export declare class StateContainer<T, A extends Action = Action> {
    private initValue;
    private dispatcher;
    private readonly stateManager;
    readonly value: Observable<T>;
    constructor(initValue: T, reducer: (s: T, action: A) => T, dispatcher?: Subject<A>);
    update(src: (() => StateResult<A>) | StateResult<A>): Observable<T>;
    private stateResultToObservable;
}
