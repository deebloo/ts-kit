(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ts-toolkit/state-container', ['exports', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global['ts-toolkit'] = global['ts-toolkit'] || {}, global['ts-toolkit']['state-container'] = {}),global.rxjs,global.rxjs.operators));
}(this, (function (exports,rxjs,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T, A
     */
    var /**
     * @template T, A
     */ StateContainer = /** @class */ (function () {
        function StateContainer(initValue, reducer, dispatcher) {
            if (dispatcher === void 0) {
                dispatcher = new rxjs.Subject();
            }
            var _this = this;
            this.initValue = initValue;
            this.dispatcher = dispatcher;
            this.stateManager = new rxjs.BehaviorSubject(this.initValue);
            this.value = this.stateManager.pipe(operators.distinctUntilChanged(), operators.shareReplay(1));
            this.dispatcher.pipe(operators.scan(reducer, initValue)).subscribe(function (state) {
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
                var result = this.stateResultToObservable(src instanceof Function ? src() : src).pipe(operators.shareReplay(1));
                result.subscribe(function (action) {
                    _this.dispatcher.next(action);
                });
                return result.pipe(operators.concatMap(function () { return _this.value; }), operators.take(1));
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
                if (rxjs.isObservable(result)) {
                    return result;
                }
                else if (result instanceof Promise) {
                    return rxjs.from(result);
                }
                return rxjs.of(result);
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

    exports.StateContainer = StateContainer;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ts-toolkit-state-container.umd.js.map