import { __spread } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Create an instance of a Dependency injector.
 * Can be used to create a singleton of any class that is property annotated with dependencies.
 *
 * @param overrides a list of explicit providers, if you need to override a provider at any point in the tree
 */
var  /**
 * Create an instance of a Dependency injector.
 * Can be used to create a singleton of any class that is property annotated with dependencies.
 *
 * @param overrides a list of explicit providers, if you need to override a provider at any point in the tree
 */
Injector = /** @class */ (function () {
    function Injector(opts, parent) {
        if (opts === void 0) { opts = { providers: [] }; }
        var _this = this;
        this.opts = opts;
        this.parent = parent;
        this.providerMap = new WeakMap();
        if (this.opts.bootstrap) {
            this.opts.bootstrap.forEach(function (provider) { return _this.get(provider); });
        }
    }
    /**
     * recursively check if a singleton instance is available for a provider
     *
     */
    /**
     * recursively check if a singleton instance is available for a provider
     *
     * @param {?} provider
     * @return {?}
     */
    Injector.prototype.has = /**
     * recursively check if a singleton instance is available for a provider
     *
     * @param {?} provider
     * @return {?}
     */
    function (provider) {
        if (!this.parent) {
            return this.providerMap.has(provider);
        }
        else {
            return this.parent.has(provider);
        }
    };
    /**
     * fetches a singleton instance of a provider
     */
    /**
     * fetches a singleton instance of a provider
     * @template T
     * @param {?} provider
     * @return {?}
     */
    Injector.prototype.get = /**
     * fetches a singleton instance of a provider
     * @template T
     * @param {?} provider
     * @return {?}
     */
    function (provider) {
        if (this.providerMap.has(provider)) {
            // if provider has already been created in this scope return it
            return this.providerMap.get(provider);
        }
        else {
            /** @type {?} */
            var override = this.findOverride(provider);
            if (override) {
                // if an override is available for this Injector use that
                return this.createSingleton(override.provider);
            }
            else if (this.parent && this.parent.has(provider)) {
                // if a parent is available and contains an instance of the provider already use that
                return this.parent.get(provider);
            }
        }
        return this.createSingleton(provider);
    };
    /**
     * Create a new instance of a provider
     */
    /**
     * Create a new instance of a provider
     * @template T
     * @param {?} provider
     * @return {?}
     */
    Injector.prototype.create = /**
     * Create a new instance of a provider
     * @template T
     * @param {?} provider
     * @return {?}
     */
    function (provider) {
        var _this = this;
        return provider.deps
            ? new (provider.bind.apply(provider, __spread([void 0], provider.deps.map(function (dep) { return _this.get(dep); }))))() : new provider();
    };
    /**
     * @private
     * @param {?} provider
     * @return {?}
     */
    Injector.prototype.createSingleton = /**
     * @private
     * @param {?} provider
     * @return {?}
     */
    function (provider) {
        /** @type {?} */
        var instance = this.create(provider);
        // cache the result in the WeakMap
        this.providerMap.set(provider, instance);
        return instance;
    };
    /**
     * @private
     * @param {?} provider
     * @return {?}
     */
    Injector.prototype.findOverride = /**
     * @private
     * @param {?} provider
     * @return {?}
     */
    function (provider) {
        if (this.opts.providers) {
            /** @type {?} */
            var override = this.opts.providers.find(function (override) { return override.provide === provider; });
            return override || null;
        }
        return null;
    };
    return Injector;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} config
 * @return {?}
 */
function Injectable(config) {
    if (config === void 0) { config = { deps: [] }; }
    return function (provider) {
        provider.deps = config.deps;
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Injector, Injectable };

//# sourceMappingURL=ts-toolkit-di.js.map