/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @record
 */
export function InjectorOptions() { }
if (false) {
    /** @type {?|undefined} */
    InjectorOptions.prototype.providers;
    /** @type {?|undefined} */
    InjectorOptions.prototype.bootstrap;
}
/**
 * Create an instance of a Dependency injector.
 * Can be used to create a singleton of any class that is property annotated with dependencies.
 *
 * @param overrides a list of explicit providers, if you need to override a provider at any point in the tree
 */
var /**
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
            ? new (provider.bind.apply(provider, tslib_1.__spread([void 0], provider.deps.map(function (dep) { return _this.get(dep); }))))() : new provider();
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
 * Create an instance of a Dependency injector.
 * Can be used to create a singleton of any class that is property annotated with dependencies.
 *
 * @param overrides a list of explicit providers, if you need to override a provider at any point in the tree
 */
export { Injector };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Injector.prototype.providerMap;
    /**
     * @type {?}
     * @private
     */
    Injector.prototype.opts;
    /**
     * @type {?}
     * @private
     */
    Injector.prototype.parent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHMtdG9vbGtpdC9kaS8iLCJzb3VyY2VzIjpbImxpYi9pbmplY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLHFDQUdDOzs7SUFGQyxvQ0FBb0M7O0lBQ3BDLG9DQUE0Qjs7Ozs7Ozs7QUFTOUI7Ozs7Ozs7SUFHRSxrQkFDVSxJQUF5QyxFQUN6QyxNQUFpQjtRQURqQixxQkFBQSxFQUFBLFNBQTBCLFNBQVMsRUFBRSxFQUFFLEVBQUU7UUFEbkQsaUJBT0M7UUFOUyxTQUFJLEdBQUosSUFBSSxDQUFxQztRQUN6QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBSm5CLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFNdEQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsc0JBQUc7Ozs7OztJQUFILFVBQUksUUFBdUI7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNILHNCQUFHOzs7Ozs7SUFBSCxVQUFPLFFBQXFCO1FBQzFCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEMsK0RBQStEO1lBQy9ELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7YUFBTTs7Z0JBQ0MsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBRTVDLElBQUksUUFBUSxFQUFFO2dCQUNaLHlEQUF5RDtnQkFDekQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNoRDtpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ25ELHFGQUFxRjtnQkFDckYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQztTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNILHlCQUFNOzs7Ozs7SUFBTixVQUFVLFFBQXFCO1FBQS9CLGlCQUlDO1FBSEMsT0FBTyxRQUFRLENBQUMsSUFBSTtZQUNsQixDQUFDLE1BQUssUUFBUSxZQUFSLFFBQVEsNkJBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFiLENBQWEsQ0FBQyxNQUN6RCxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7Ozs7SUFFTyxrQ0FBZTs7Ozs7SUFBdkIsVUFBd0IsUUFBdUI7O1lBQ3ZDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUV0QyxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXpDLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Ozs7OztJQUVPLCtCQUFZOzs7OztJQUFwQixVQUFxQixRQUF1QjtRQUMxQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFOztnQkFDakIsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDdkMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBN0IsQ0FBNkIsQ0FDMUM7WUFFRCxPQUFPLFFBQVEsSUFBSSxJQUFJLENBQUM7U0FDekI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQTNFRCxJQTJFQzs7Ozs7Ozs7Ozs7OztJQTFFQywrQkFBd0Q7Ozs7O0lBR3RELHdCQUFpRDs7Ozs7SUFDakQsMEJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvdmlkZXIsIE92ZXJyaWRlUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBJbmplY3Rvck9wdGlvbnMge1xuICBwcm92aWRlcnM/OiBPdmVycmlkZVByb3ZpZGVyPGFueT5bXTtcbiAgYm9vdHN0cmFwPzogUHJvdmlkZXI8YW55PltdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBhIERlcGVuZGVuY3kgaW5qZWN0b3IuXG4gKiBDYW4gYmUgdXNlZCB0byBjcmVhdGUgYSBzaW5nbGV0b24gb2YgYW55IGNsYXNzIHRoYXQgaXMgcHJvcGVydHkgYW5ub3RhdGVkIHdpdGggZGVwZW5kZW5jaWVzLlxuICpcbiAqIEBwYXJhbSBvdmVycmlkZXMgYSBsaXN0IG9mIGV4cGxpY2l0IHByb3ZpZGVycywgaWYgeW91IG5lZWQgdG8gb3ZlcnJpZGUgYSBwcm92aWRlciBhdCBhbnkgcG9pbnQgaW4gdGhlIHRyZWVcbiAqL1xuZXhwb3J0IGNsYXNzIEluamVjdG9yIHtcbiAgcHJpdmF0ZSBwcm92aWRlck1hcCA9IG5ldyBXZWFrTWFwPFByb3ZpZGVyPGFueT4sIGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG9wdHM6IEluamVjdG9yT3B0aW9ucyA9IHsgcHJvdmlkZXJzOiBbXSB9LFxuICAgIHByaXZhdGUgcGFyZW50PzogSW5qZWN0b3JcbiAgKSB7XG4gICAgaWYgKHRoaXMub3B0cy5ib290c3RyYXApIHtcbiAgICAgIHRoaXMub3B0cy5ib290c3RyYXAuZm9yRWFjaChwcm92aWRlciA9PiB0aGlzLmdldChwcm92aWRlcikpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZWN1cnNpdmVseSBjaGVjayBpZiBhIHNpbmdsZXRvbiBpbnN0YW5jZSBpcyBhdmFpbGFibGUgZm9yIGEgcHJvdmlkZXJcbiAgICpcbiAgICovXG4gIGhhcyhwcm92aWRlcjogUHJvdmlkZXI8YW55Pik6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3ZpZGVyTWFwLmhhcyhwcm92aWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudC5oYXMocHJvdmlkZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBmZXRjaGVzIGEgc2luZ2xldG9uIGluc3RhbmNlIG9mIGEgcHJvdmlkZXJcbiAgICovXG4gIGdldDxUPihwcm92aWRlcjogUHJvdmlkZXI8VD4pOiBUIHtcbiAgICBpZiAodGhpcy5wcm92aWRlck1hcC5oYXMocHJvdmlkZXIpKSB7XG4gICAgICAvLyBpZiBwcm92aWRlciBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQgaW4gdGhpcyBzY29wZSByZXR1cm4gaXRcbiAgICAgIHJldHVybiB0aGlzLnByb3ZpZGVyTWFwLmdldChwcm92aWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG92ZXJyaWRlID0gdGhpcy5maW5kT3ZlcnJpZGUocHJvdmlkZXIpO1xuXG4gICAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgICAgLy8gaWYgYW4gb3ZlcnJpZGUgaXMgYXZhaWxhYmxlIGZvciB0aGlzIEluamVjdG9yIHVzZSB0aGF0XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVNpbmdsZXRvbihvdmVycmlkZS5wcm92aWRlcik7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50Lmhhcyhwcm92aWRlcikpIHtcbiAgICAgICAgLy8gaWYgYSBwYXJlbnQgaXMgYXZhaWxhYmxlIGFuZCBjb250YWlucyBhbiBpbnN0YW5jZSBvZiB0aGUgcHJvdmlkZXIgYWxyZWFkeSB1c2UgdGhhdFxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0KHByb3ZpZGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVTaW5nbGV0b24ocHJvdmlkZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBhIHByb3ZpZGVyXG4gICAqL1xuICBjcmVhdGU8VD4ocHJvdmlkZXI6IFByb3ZpZGVyPFQ+KTogVCB7XG4gICAgcmV0dXJuIHByb3ZpZGVyLmRlcHNcbiAgICAgID8gbmV3IHByb3ZpZGVyKC4uLnByb3ZpZGVyLmRlcHMubWFwKGRlcCA9PiB0aGlzLmdldChkZXApKSlcbiAgICAgIDogbmV3IHByb3ZpZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVNpbmdsZXRvbihwcm92aWRlcjogUHJvdmlkZXI8YW55Pikge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5jcmVhdGUocHJvdmlkZXIpO1xuXG4gICAgLy8gY2FjaGUgdGhlIHJlc3VsdCBpbiB0aGUgV2Vha01hcFxuICAgIHRoaXMucHJvdmlkZXJNYXAuc2V0KHByb3ZpZGVyLCBpbnN0YW5jZSk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIGZpbmRPdmVycmlkZShwcm92aWRlcjogUHJvdmlkZXI8YW55Pik6IE92ZXJyaWRlUHJvdmlkZXI8YW55PiB8IG51bGwge1xuICAgIGlmICh0aGlzLm9wdHMucHJvdmlkZXJzKSB7XG4gICAgICBjb25zdCBvdmVycmlkZSA9IHRoaXMub3B0cy5wcm92aWRlcnMuZmluZChcbiAgICAgICAgb3ZlcnJpZGUgPT4gb3ZlcnJpZGUucHJvdmlkZSA9PT0gcHJvdmlkZXJcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBvdmVycmlkZSB8fCBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=