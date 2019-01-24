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
var /**
 * @template T, A
 */
StateContainer = /** @class */ (function () {
    function StateContainer(initValue, reducer, dispatcher) {
        if (dispatcher === void 0) { dispatcher = new Subject(); }
        var _this = this;
        this.initValue = initValue;
        this.dispatcher = dispatcher;
        this.stateManager = new BehaviorSubject(this.initValue);
        this.value = this.stateManager.pipe(distinctUntilChanged(), shareReplay(1));
        this.dispatcher.pipe(scan(reducer, initValue)).subscribe(function (state) {
            _this.stateManager.next(state);
        });
    }
    /**
     * @param {?} src
     * @return {?}
     */
    StateContainer.prototype.update = /**
     * @param {?} src
     * @return {?}
     */
    function (src) {
        var _this = this;
        /** @type {?} */
        var result = this.stateResultToObservable(src instanceof Function ? src() : src).pipe(shareReplay(1));
        result.subscribe(function (action) {
            _this.dispatcher.next(action);
        });
        return result.pipe(concatMap(function () { return _this.value; }), take(1));
    };
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    StateContainer.prototype.stateResultToObservable = /**
     * @private
     * @param {?} result
     * @return {?}
     */
    function (result) {
        if (isObservable(result)) {
            return result;
        }
        else if (result instanceof Promise) {
            return from(result);
        }
        return of(result);
    };
    return StateContainer;
}());
/**
 * @template T, A
 */
export { StateContainer };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRzLXRvb2xraXQvc3RhdGUtY29udGFpbmVyLyIsInNvdXJjZXMiOlsibGliL3N0YXRlLWNvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBYyxZQUFZLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUUxRiw0QkFHQzs7O0lBRkMsc0JBQVE7O0lBQ1IseUJBQWM7Ozs7O0FBS2hCOzs7O0lBUUUsd0JBQ1UsU0FBWSxFQUNwQixPQUErQixFQUN2QixVQUF5QztRQUF6QywyQkFBQSxFQUFBLGlCQUE2QixPQUFPLEVBQUs7UUFIbkQsaUJBUUM7UUFQUyxjQUFTLEdBQVQsU0FBUyxDQUFHO1FBRVosZUFBVSxHQUFWLFVBQVUsQ0FBK0I7UUFWbEMsaUJBQVksR0FBdUIsSUFBSSxlQUFlLENBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWxGLFVBQUssR0FBa0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ3BELG9CQUFvQixFQUFFLEVBQ3RCLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDZixDQUFDO1FBT0EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFPLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDbEUsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELCtCQUFNOzs7O0lBQU4sVUFBTyxHQUE0QztRQUFuRCxpQkFhQzs7WUFaTyxNQUFNLEdBQWtCLElBQUksQ0FBQyx1QkFBdUIsQ0FDeEQsR0FBRyxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FDdEMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRCLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3JCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUNoQixTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQVYsQ0FBVSxDQUFDLEVBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRU8sZ0RBQXVCOzs7OztJQUEvQixVQUFnQyxNQUFzQjtRQUNwRCxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4QixPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU0sSUFBSSxNQUFNLFlBQVksT0FBTyxFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQTFDRCxJQTBDQzs7Ozs7Ozs7OztJQXpDQyxzQ0FBMkY7O0lBRTNGLCtCQUdFOzs7OztJQUdBLG1DQUFvQjs7Ozs7SUFFcEIsb0NBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBpc09ic2VydmFibGUsIG9mLCBmcm9tLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzaGFyZVJlcGxheSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHNjYW4sIGNvbmNhdE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb248VCA9IHN0cmluZyB8IG51bWJlcj4ge1xuICB0eXBlOiBUO1xuICBwYXlsb2FkPzogYW55O1xufVxuXG5leHBvcnQgdHlwZSBTdGF0ZVJlc3VsdDxBID0gQWN0aW9uPiA9IEEgfCBPYnNlcnZhYmxlPEE+IHwgUHJvbWlzZTxBPjtcblxuZXhwb3J0IGNsYXNzIFN0YXRlQ29udGFpbmVyPFQsIEEgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBzdGF0ZU1hbmFnZXI6IEJlaGF2aW9yU3ViamVjdDxUPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VD4odGhpcy5pbml0VmFsdWUpO1xuXG4gIHJlYWRvbmx5IHZhbHVlOiBPYnNlcnZhYmxlPFQ+ID0gdGhpcy5zdGF0ZU1hbmFnZXIucGlwZShcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgIHNoYXJlUmVwbGF5KDEpXG4gICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpbml0VmFsdWU6IFQsXG4gICAgcmVkdWNlcjogKHM6IFQsIGFjdGlvbjogQSkgPT4gVCxcbiAgICBwcml2YXRlIGRpc3BhdGNoZXI6IFN1YmplY3Q8QT4gPSBuZXcgU3ViamVjdDxBPigpXG4gICkge1xuICAgIHRoaXMuZGlzcGF0Y2hlci5waXBlKHNjYW48QSwgVD4ocmVkdWNlciwgaW5pdFZhbHVlKSkuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLm5leHQoc3RhdGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKHNyYzogKCgpID0+IFN0YXRlUmVzdWx0PEE+KSB8IFN0YXRlUmVzdWx0PEE+KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3QgcmVzdWx0OiBPYnNlcnZhYmxlPEE+ID0gdGhpcy5zdGF0ZVJlc3VsdFRvT2JzZXJ2YWJsZShcbiAgICAgIHNyYyBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gc3JjKCkgOiBzcmNcbiAgICApLnBpcGUoc2hhcmVSZXBsYXkoMSkpO1xuXG4gICAgcmVzdWx0LnN1YnNjcmliZShhY3Rpb24gPT4ge1xuICAgICAgdGhpcy5kaXNwYXRjaGVyLm5leHQoYWN0aW9uKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQucGlwZShcbiAgICAgIGNvbmNhdE1hcCgoKSA9PiB0aGlzLnZhbHVlKSxcbiAgICAgIHRha2UoMSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0ZVJlc3VsdFRvT2JzZXJ2YWJsZShyZXN1bHQ6IFN0YXRlUmVzdWx0PEE+KTogT2JzZXJ2YWJsZTxBPiB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZShyZXN1bHQpKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIGZyb20ocmVzdWx0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2YocmVzdWx0KTtcbiAgfVxufVxuIl19