import { BehaviorSubject, isObservable, of, from, Subject } from 'rxjs';
import { shareReplay, distinctUntilChanged, scan, concatMap, take } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, A
 */
var  /**
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { StateContainer };

//# sourceMappingURL=ts-toolkit-state-container.js.map