/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function InjectableConfig() { }
if (false) {
    /** @type {?|undefined} */
    InjectableConfig.prototype.deps;
}
/**
 * @param {?=} config
 * @return {?}
 */
export function Injectable(config = { deps: [] }) {
    return function (provider) {
        provider.deps = config.deps;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cy10b29sa2l0L2RpLyIsInNvdXJjZXMiOlsibGliL2luamVjdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLHNDQUVDOzs7SUFEQyxnQ0FBdUI7Ozs7OztBQUd6QixNQUFNLFVBQVUsVUFBVSxDQUFDLFNBQTJCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtJQUNoRSxPQUFPLFVBQVMsUUFBdUI7UUFDckMsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzlCLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVDb25maWcge1xuICBkZXBzPzogUHJvdmlkZXI8YW55PltdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSW5qZWN0YWJsZShjb25maWc6IEluamVjdGFibGVDb25maWcgPSB7IGRlcHM6IFtdIH0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHByb3ZpZGVyOiBQcm92aWRlcjxhbnk+KSB7XG4gICAgcHJvdmlkZXIuZGVwcyA9IGNvbmZpZy5kZXBzO1xuICB9O1xufVxuIl19