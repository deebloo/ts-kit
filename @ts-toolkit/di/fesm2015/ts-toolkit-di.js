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
class Injector {
    /**
     * @param {?=} opts
     * @param {?=} parent
     */
    constructor(opts = { providers: [] }, parent) {
        this.opts = opts;
        this.parent = parent;
        this.providerMap = new WeakMap();
        if (this.opts.bootstrap) {
            this.opts.bootstrap.forEach(provider => this.get(provider));
        }
    }
    /**
     * recursively check if a singleton instance is available for a provider
     *
     * @param {?} provider
     * @return {?}
     */
    has(provider) {
        if (!this.parent) {
            return this.providerMap.has(provider);
        }
        else {
            return this.parent.has(provider);
        }
    }
    /**
     * fetches a singleton instance of a provider
     * @template T
     * @param {?} provider
     * @return {?}
     */
    get(provider) {
        if (this.providerMap.has(provider)) {
            // if provider has already been created in this scope return it
            return this.providerMap.get(provider);
        }
        else {
            /** @type {?} */
            const override = this.findOverride(provider);
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
    }
    /**
     * Create a new instance of a provider
     * @template T
     * @param {?} provider
     * @return {?}
     */
    create(provider) {
        return provider.deps
            ? new provider(...provider.deps.map(dep => this.get(dep)))
            : new provider();
    }
    /**
     * @private
     * @param {?} provider
     * @return {?}
     */
    createSingleton(provider) {
        /** @type {?} */
        const instance = this.create(provider);
        // cache the result in the WeakMap
        this.providerMap.set(provider, instance);
        return instance;
    }
    /**
     * @private
     * @param {?} provider
     * @return {?}
     */
    findOverride(provider) {
        if (this.opts.providers) {
            /** @type {?} */
            const override = this.opts.providers.find(override => override.provide === provider);
            return override || null;
        }
        return null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} config
 * @return {?}
 */
function Injectable(config = { deps: [] }) {
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