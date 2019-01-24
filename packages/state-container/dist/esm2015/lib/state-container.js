/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject, isObservable, of, from, Subject } from 'rxjs';
import { shareReplay, distinctUntilChanged, scan, concatMap, take } from 'rxjs/operators';
/**
 * @record
 * @template T
 */
export function Action() { }
if (false) {
    /** @type {?} */
    Action.prototype.type;
    /** @type {?|undefined} */
    Action.prototype.payload;
}
/**
 * @template T, A
 */
export class StateContainer {
    /**
     * @param {?} initValue
     * @param {?} reducer
     * @param {?=} dispatcher
     */
    constructor(initValue, reducer, dispatcher = new Subject()) {
        this.initValue = initValue;
        this.dispatcher = dispatcher;
        this.stateManager = new BehaviorSubject(this.initValue);
        this.value = this.stateManager.pipe(distinctUntilChanged(), shareReplay(1));
        this.dispatcher.pipe(scan(reducer, initValue)).subscribe(state => {
            this.stateManager.next(state);
        });
    }
    /**
     * @param {?} src
     * @return {?}
     */
    update(src) {
        /** @type {?} */
        const result = this.stateResultToObservable(src instanceof Function ? src() : src).pipe(shareReplay(1));
        result.subscribe(action => {
            this.dispatcher.next(action);
        });
        return result.pipe(concatMap(() => this.value), take(1));
    }
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    stateResultToObservable(result) {
        if (isObservable(result)) {
            return result;
        }
        else if (result instanceof Promise) {
            return from(result);
        }
        return of(result);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    StateContainer.prototype.stateManager;
    /** @type {?} */
    StateContainer.prototype.value;
    /**
     * @type {?}
     * @private
     */
    StateContainer.prototype.initValue;
    /**
     * @type {?}
     * @private
     */
    StateContainer.prototype.dispatcher;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRzLXRvb2xraXQvc3RhdGUtY29udGFpbmVyLyIsInNvdXJjZXMiOlsibGliL3N0YXRlLWNvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBYyxZQUFZLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUUxRiw0QkFHQzs7O0lBRkMsc0JBQVE7O0lBQ1IseUJBQWM7Ozs7O0FBS2hCLE1BQU0sT0FBTyxjQUFjOzs7Ozs7SUFRekIsWUFDVSxTQUFZLEVBQ3BCLE9BQStCLEVBQ3ZCLGFBQXlCLElBQUksT0FBTyxFQUFLO1FBRnpDLGNBQVMsR0FBVCxTQUFTLENBQUc7UUFFWixlQUFVLEdBQVYsVUFBVSxDQUErQjtRQVZsQyxpQkFBWSxHQUF1QixJQUFJLGVBQWUsQ0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbEYsVUFBSyxHQUFrQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDcEQsb0JBQW9CLEVBQUUsRUFDdEIsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNmLENBQUM7UUFPQSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQU8sT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBNEM7O2NBQzNDLE1BQU0sR0FBa0IsSUFBSSxDQUFDLHVCQUF1QixDQUN4RCxHQUFHLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUN0QyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDLElBQUksQ0FDaEIsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFTyx1QkFBdUIsQ0FBQyxNQUFzQjtRQUNwRCxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4QixPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU0sSUFBSSxNQUFNLFlBQVksT0FBTyxFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUNGOzs7Ozs7SUF6Q0Msc0NBQTJGOztJQUUzRiwrQkFHRTs7Ozs7SUFHQSxtQ0FBb0I7Ozs7O0lBRXBCLG9DQUFpRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgaXNPYnNlcnZhYmxlLCBvZiwgZnJvbSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmVSZXBsYXksIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzY2FuLCBjb25jYXRNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uPFQgPSBzdHJpbmcgfCBudW1iZXI+IHtcbiAgdHlwZTogVDtcbiAgcGF5bG9hZD86IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgU3RhdGVSZXN1bHQ8QSA9IEFjdGlvbj4gPSBBIHwgT2JzZXJ2YWJsZTxBPiB8IFByb21pc2U8QT47XG5cbmV4cG9ydCBjbGFzcyBTdGF0ZUNvbnRhaW5lcjxULCBBIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhdGVNYW5hZ2VyOiBCZWhhdmlvclN1YmplY3Q8VD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFQ+KHRoaXMuaW5pdFZhbHVlKTtcblxuICByZWFkb25seSB2YWx1ZTogT2JzZXJ2YWJsZTxUPiA9IHRoaXMuc3RhdGVNYW5hZ2VyLnBpcGUoXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICBzaGFyZVJlcGxheSgxKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaW5pdFZhbHVlOiBULFxuICAgIHJlZHVjZXI6IChzOiBULCBhY3Rpb246IEEpID0+IFQsXG4gICAgcHJpdmF0ZSBkaXNwYXRjaGVyOiBTdWJqZWN0PEE+ID0gbmV3IFN1YmplY3Q8QT4oKVxuICApIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIucGlwZShzY2FuPEEsIFQ+KHJlZHVjZXIsIGluaXRWYWx1ZSkpLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICB0aGlzLnN0YXRlTWFuYWdlci5uZXh0KHN0YXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZShzcmM6ICgoKSA9PiBTdGF0ZVJlc3VsdDxBPikgfCBTdGF0ZVJlc3VsdDxBPik6IE9ic2VydmFibGU8VD4ge1xuICAgIGNvbnN0IHJlc3VsdDogT2JzZXJ2YWJsZTxBPiA9IHRoaXMuc3RhdGVSZXN1bHRUb09ic2VydmFibGUoXG4gICAgICBzcmMgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHNyYygpIDogc3JjXG4gICAgKS5waXBlKHNoYXJlUmVwbGF5KDEpKTtcblxuICAgIHJlc3VsdC5zdWJzY3JpYmUoYWN0aW9uID0+IHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hlci5uZXh0KGFjdGlvbik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0LnBpcGUoXG4gICAgICBjb25jYXRNYXAoKCkgPT4gdGhpcy52YWx1ZSksXG4gICAgICB0YWtlKDEpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGVSZXN1bHRUb09ic2VydmFibGUocmVzdWx0OiBTdGF0ZVJlc3VsdDxBPik6IE9ic2VydmFibGU8QT4ge1xuICAgIGlmIChpc09ic2VydmFibGUocmVzdWx0KSkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgIHJldHVybiBmcm9tKHJlc3VsdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mKHJlc3VsdCk7XG4gIH1cbn1cbiJdfQ==