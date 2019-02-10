import { Provider, OverrideProvider, ClassProvider } from './provider';

export interface InjectorOptions {
  providers?: OverrideProvider<any>[];
  bootstrap?: Provider<any>[];
}

/**
 * Create an instance of a Dependency injector.
 * Can be used to create a singleton of any class that is property annotated with dependencies.
 *
 * @param opts configuration options for the current instance of Injector
 * @param parent a parent instance of Injector
 */
export class Injector {
  private providerMap = new WeakMap<Provider<any>, any>();

  constructor(private opts: InjectorOptions = { providers: [] }, private parent?: Injector) {
    if (this.opts.bootstrap) {
      this.opts.bootstrap.forEach(provider => this.get(provider));
    }
  }

  /**
   * recursively check if a singleton instance is available for a provider
   *
   */
  has(provider: Provider<any>): boolean {
    if (!this.parent) {
      return this.providerMap.has(provider);
    } else {
      return this.parent.has(provider);
    }
  }

  /**
   * fetches a singleton instance of a provider
   */
  get<T>(provider: Provider<T>): T {
    if (this.providerMap.has(provider)) {
      // if provider has already been created in this scope return it
      return this.providerMap.get(provider);
    } else {
      const override = this.findOverride(provider);

      if (override) {
        // if an override is available for this Injector use that
        return this.createSingleton(override.useClass);
      } else if (this.parent && this.parent.has(provider)) {
        // if a parent is available and contains an instance of the provider already use that
        return this.parent.get(provider);
      }
    }

    return this.createSingleton(<ClassProvider<T>>provider);
  }

  /**
   * Create a new instance of a provider
   */
  create<T>(P: ClassProvider<T>): T {
    return P.deps ? new P(...P.deps.map(dep => this.get(dep))) : new P();
  }

  private createSingleton(provider: ClassProvider<any>) {
    const instance = this.create(provider);

    // cache the result in the WeakMap
    this.providerMap.set(provider, instance);

    return instance;
  }

  private findOverride(provider: Provider<any>): OverrideProvider<any> | null {
    if (this.opts.providers) {
      const override = this.opts.providers.find(override => override.provide === provider);

      return override || null;
    }

    return null;
  }
}
