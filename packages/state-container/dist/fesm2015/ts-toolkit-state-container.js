import { BehaviorSubject, isObservable, of, from, Subject } from 'rxjs';
import { shareReplay, distinctUntilChanged, scan, concatMap, take } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, A
 */
class StateContainer {
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