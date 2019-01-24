import { Provider, OverrideProvider } from './provider';
export interface InjectorOptions {
    providers?: OverrideProvider<any>[];
    bootstrap?: Provider<any>[];
}
/**
 * Create an instance of a Dependency injector.
 * Can be used to create a singleton of any class that is property annotated with dependencies.
 *
 * @param overrides a list of explicit providers, if you need to override a provider at any point in the tree
 */
export declare class Injector {
    private opts;
    private parent?;
    private providerMap;
    constructor(opts?: InjectorOptions, parent?: Injector);
    /**
     * recursively check if a singleton instance is available for a provider
     *
     */
    has(provider: Provider<any>): boolean;
    /**
     * fetches a singleton instance of a provider
     */
    get<T>(provider: Provider<T>): T;
    /**
     * Create a new instance of a provider
     */
    create<T>(provider: Provider<T>): T;
    private createSingleton;
    private findOverride;
}
