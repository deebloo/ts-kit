/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class Injector {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHMtdG9vbGtpdC9kaS8iLCJzb3VyY2VzIjpbImxpYi9pbmplY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUEscUNBR0M7OztJQUZDLG9DQUFvQzs7SUFDcEMsb0NBQTRCOzs7Ozs7OztBQVM5QixNQUFNLE9BQU8sUUFBUTs7Ozs7SUFHbkIsWUFDVSxPQUF3QixFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFDekMsTUFBaUI7UUFEakIsU0FBSSxHQUFKLElBQUksQ0FBcUM7UUFDekMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUpuQixnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFzQixDQUFDO1FBTXRELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQzs7Ozs7OztJQU1ELEdBQUcsQ0FBQyxRQUF1QjtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7Ozs7OztJQUtELEdBQUcsQ0FBSSxRQUFxQjtRQUMxQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xDLCtEQUErRDtZQUMvRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO2FBQU07O2tCQUNDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUU1QyxJQUFJLFFBQVEsRUFBRTtnQkFDWix5REFBeUQ7Z0JBQ3pELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDaEQ7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNuRCxxRkFBcUY7Z0JBQ3JGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEM7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7O0lBS0QsTUFBTSxDQUFJLFFBQXFCO1FBQzdCLE9BQU8sUUFBUSxDQUFDLElBQUk7WUFDbEIsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBRU8sZUFBZSxDQUFDLFFBQXVCOztjQUN2QyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFFdEMsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV6QyxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7Ozs7SUFFTyxZQUFZLENBQUMsUUFBdUI7UUFDMUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTs7a0JBQ2pCLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ3ZDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQzFDO1lBRUQsT0FBTyxRQUFRLElBQUksSUFBSSxDQUFDO1NBQ3pCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7Ozs7OztJQTFFQywrQkFBd0Q7Ozs7O0lBR3RELHdCQUFpRDs7Ozs7SUFDakQsMEJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvdmlkZXIsIE92ZXJyaWRlUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBJbmplY3Rvck9wdGlvbnMge1xuICBwcm92aWRlcnM/OiBPdmVycmlkZVByb3ZpZGVyPGFueT5bXTtcbiAgYm9vdHN0cmFwPzogUHJvdmlkZXI8YW55PltdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBhIERlcGVuZGVuY3kgaW5qZWN0b3IuXG4gKiBDYW4gYmUgdXNlZCB0byBjcmVhdGUgYSBzaW5nbGV0b24gb2YgYW55IGNsYXNzIHRoYXQgaXMgcHJvcGVydHkgYW5ub3RhdGVkIHdpdGggZGVwZW5kZW5jaWVzLlxuICpcbiAqIEBwYXJhbSBvdmVycmlkZXMgYSBsaXN0IG9mIGV4cGxpY2l0IHByb3ZpZGVycywgaWYgeW91IG5lZWQgdG8gb3ZlcnJpZGUgYSBwcm92aWRlciBhdCBhbnkgcG9pbnQgaW4gdGhlIHRyZWVcbiAqL1xuZXhwb3J0IGNsYXNzIEluamVjdG9yIHtcbiAgcHJpdmF0ZSBwcm92aWRlck1hcCA9IG5ldyBXZWFrTWFwPFByb3ZpZGVyPGFueT4sIGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG9wdHM6IEluamVjdG9yT3B0aW9ucyA9IHsgcHJvdmlkZXJzOiBbXSB9LFxuICAgIHByaXZhdGUgcGFyZW50PzogSW5qZWN0b3JcbiAgKSB7XG4gICAgaWYgKHRoaXMub3B0cy5ib290c3RyYXApIHtcbiAgICAgIHRoaXMub3B0cy5ib290c3RyYXAuZm9yRWFjaChwcm92aWRlciA9PiB0aGlzLmdldChwcm92aWRlcikpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZWN1cnNpdmVseSBjaGVjayBpZiBhIHNpbmdsZXRvbiBpbnN0YW5jZSBpcyBhdmFpbGFibGUgZm9yIGEgcHJvdmlkZXJcbiAgICpcbiAgICovXG4gIGhhcyhwcm92aWRlcjogUHJvdmlkZXI8YW55Pik6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3ZpZGVyTWFwLmhhcyhwcm92aWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudC5oYXMocHJvdmlkZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBmZXRjaGVzIGEgc2luZ2xldG9uIGluc3RhbmNlIG9mIGEgcHJvdmlkZXJcbiAgICovXG4gIGdldDxUPihwcm92aWRlcjogUHJvdmlkZXI8VD4pOiBUIHtcbiAgICBpZiAodGhpcy5wcm92aWRlck1hcC5oYXMocHJvdmlkZXIpKSB7XG4gICAgICAvLyBpZiBwcm92aWRlciBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQgaW4gdGhpcyBzY29wZSByZXR1cm4gaXRcbiAgICAgIHJldHVybiB0aGlzLnByb3ZpZGVyTWFwLmdldChwcm92aWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG92ZXJyaWRlID0gdGhpcy5maW5kT3ZlcnJpZGUocHJvdmlkZXIpO1xuXG4gICAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgICAgLy8gaWYgYW4gb3ZlcnJpZGUgaXMgYXZhaWxhYmxlIGZvciB0aGlzIEluamVjdG9yIHVzZSB0aGF0XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVNpbmdsZXRvbihvdmVycmlkZS5wcm92aWRlcik7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50Lmhhcyhwcm92aWRlcikpIHtcbiAgICAgICAgLy8gaWYgYSBwYXJlbnQgaXMgYXZhaWxhYmxlIGFuZCBjb250YWlucyBhbiBpbnN0YW5jZSBvZiB0aGUgcHJvdmlkZXIgYWxyZWFkeSB1c2UgdGhhdFxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0KHByb3ZpZGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVTaW5nbGV0b24ocHJvdmlkZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBhIHByb3ZpZGVyXG4gICAqL1xuICBjcmVhdGU8VD4ocHJvdmlkZXI6IFByb3ZpZGVyPFQ+KTogVCB7XG4gICAgcmV0dXJuIHByb3ZpZGVyLmRlcHNcbiAgICAgID8gbmV3IHByb3ZpZGVyKC4uLnByb3ZpZGVyLmRlcHMubWFwKGRlcCA9PiB0aGlzLmdldChkZXApKSlcbiAgICAgIDogbmV3IHByb3ZpZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVNpbmdsZXRvbihwcm92aWRlcjogUHJvdmlkZXI8YW55Pikge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5jcmVhdGUocHJvdmlkZXIpO1xuXG4gICAgLy8gY2FjaGUgdGhlIHJlc3VsdCBpbiB0aGUgV2Vha01hcFxuICAgIHRoaXMucHJvdmlkZXJNYXAuc2V0KHByb3ZpZGVyLCBpbnN0YW5jZSk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIGZpbmRPdmVycmlkZShwcm92aWRlcjogUHJvdmlkZXI8YW55Pik6IE92ZXJyaWRlUHJvdmlkZXI8YW55PiB8IG51bGwge1xuICAgIGlmICh0aGlzLm9wdHMucHJvdmlkZXJzKSB7XG4gICAgICBjb25zdCBvdmVycmlkZSA9IHRoaXMub3B0cy5wcm92aWRlcnMuZmluZChcbiAgICAgICAgb3ZlcnJpZGUgPT4gb3ZlcnJpZGUucHJvdmlkZSA9PT0gcHJvdmlkZXJcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBvdmVycmlkZSB8fCBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=